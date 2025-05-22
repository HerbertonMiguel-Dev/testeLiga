import React, { useState, useEffect } from 'react';
import { H1, P } from '../components/Common/Text/Text';
import InfoCards from '../components/MedSchedule/InfoCards/InfoCards';
import AgendamentoForm from '../components/MedSchedule/AgendamentoForm/AgendamentoForm';
import AgendamentosList from '../components/MedSchedule/AgendamentosList/AgendamentosList';
import AtendimentosList from '../components/MedSchedule/AtendimentosList/AtendimentosList';
import {
  getEspecialidades, getConvenios, getHorariosDisponiveis,
  postAgendamento, getAgendamentos, postAtendimento, getAtendimentos
} from '../api/api';
import { useLocation } from 'react-router-dom';

function DashboardPage() {
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [especialidadesInfo, setEspecialidadesInfo] = useState([]);
  const [conveniosInfo, setConveniosInfo] = useState([]);

  const [paciente, setPaciente] = useState('');
  const [especialidadeAgendamento, setEspecialidadeAgendamento] = useState('');
  const [convenioAgendamento, setConvenioAgendamento] = useState('');
  const [dataAgendamento, setDataAgendamento] = useState('');
  const [medicoFiltro, setMedicoFiltro] = useState('');
  const [horarios, setHorarios] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [agendamentos, setAgendamentos] = useState([]);

  const [atendimentos, setAtendimentos] = useState([]);

  const [especialidadesForm, setEspecialidadesForm] = useState([]);
  const [conveniosForm, setConveniosForm] = useState([]);
  const [formLoading, setFormLoading] = useState(true);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    console.log("[DashboardPage] selectedSlot atualizado:", selectedSlot);
  }, [selectedSlot]);

  useEffect(() => {
    fetchFormData();
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const path = location.pathname;

    if (path === '/') {
      fetchInfoCardsData();
    } else if (path === '/agendamento') {
      fetchAgendamentosData();
    } else if (path === '/atendimentos') {
      fetchAtendimentosData();
    }
  }, [location.pathname]);

  const fetchFormData = async () => {
    setFormLoading(true);
    setFormError(null);
    try {
      const [espRes, convRes] = await Promise.all([
        getEspecialidades(),
        getConvenios()
      ]);
      setEspecialidadesForm(espRes);
      setConveniosForm(convRes);
    } catch (err) {
      setFormError("Erro ao carregar dados do formulário: " + err.message);
      console.error('Erro ao carregar dados do formulário:', err);
    } finally {
      setFormLoading(false);
    }
  };

  const fetchInfoCardsData = async () => {
    setLoading(true);
    try {
      const [especialidadesRes, conveniosRes] = await Promise.all([
        getEspecialidades(),
        getConvenios()
      ]);
      setEspecialidadesInfo(especialidadesRes);
      setConveniosInfo(conveniosRes);
    } catch (err) {
      setError("Erro ao carregar informações: " + err.message);
      console.error("Erro na HomePage:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAgendamentosData = async () => {
    setLoading(true);
    try {
      const response = await getAgendamentos();
      setAgendamentos(response);
    } catch (err) {
      setError("Erro ao buscar agendamentos: " + err.log);
      console.error('Erro ao buscar agendamentos:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAtendimentosData = async () => {
    setLoading(true);
    try {
      const response = await getAtendimentos();
      setAtendimentos(response);
    } catch (err) {
      setError("Erro ao buscar atendimentos: " + err.log);
      console.error('Erro ao buscar atendimentos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerificarHorarios = async () => {
    if (!especialidadeAgendamento || !dataAgendamento) {
      alert("Por favor, selecione uma especialidade e uma data para verificar horários.");
      return;
    }
    setHorarios([]);
    setSelectedSlot(null);

    try {
      const dadosVerificacao = {
        especialidadeId: parseInt(especialidadeAgendamento),
        data: dataAgendamento,
        medico: medicoFiltro
      };
      const horariosDisponiveis = await getHorariosDisponiveis(dadosVerificacao);

      // MODIFICAÇÃO IMPORTANTE AQUI: Adicionar um ID único a cada slot
      const horariosComIdUnico = horariosDisponiveis.map((slot, index) => ({
        ...slot,
        // Combina médico, hora e índice para garantir unicidade, ou use um gerador de UUID
        // Ex: `medico:${slot.medico}-hora:${slot.horaInicio}-${index}`
        // OU `uuidv4()` se você instalar 'uuid'
        uniqueId: `${slot.medicoId}-${slot.horaInicio}-${slot.horaFim}-${slot.medico}-${index}`
      }));

      setHorarios(horariosComIdUnico); // Define os horários com o ID único
      console.log("[DashboardPage - handleVerificarHorarios] Horários recebidos com ID único:", horariosComIdUnico);
    } catch (err) {
      console.error('Erro ao verificar horários:', err);
      alert('Erro ao verificar horários disponíveis.');
      setHorarios([]);
    }
  };

  const handleEspecialidadeChange = (e) => {
    setEspecialidadeAgendamento(e.target.value);
    setSelectedSlot(null);
    setHorarios([]);
  };

  const handleDataChange = (e) => {
    setDataAgendamento(e.target.value);
    setSelectedSlot(null);
    setHorarios([]);
  };

  const handleMedicoFiltroChange = (e) => {
    setMedicoFiltro(e.target.value);
    setSelectedSlot(null);
    setHorarios([]);
  };

  const handleAgendarConsulta = async () => {


    if (!paciente || !especialidadeAgendamento || !convenioAgendamento || !selectedSlot) {
      alert("Por favor, preencha todos os campos e selecione um horário para agendar.");
      console.log("[DashboardPage - handleAgendarConsulta] ALERTA DISPARADO: selectedSlot é nulo ou algum campo está faltando.");
      return;
    }

    if (!selectedSlot.medico) { 
      alert("Erro: O nome do médico selecionado não foi encontrado no slot. Por favor, tente selecionar o horário novamente ou contate o suporte.");
      console.error("[DashboardPage - handleAgendarConsulta] selectedSlot não contém medico (propriedade do DTO do backend):", selectedSlot);
      return;
    }

    try {
      const dadosAgendamento = {
        Paciente: paciente, 
        EspecialidadeId: parseInt(especialidadeAgendamento),
        ConvenioId: parseInt(convenioAgendamento),
        DataHora: `${dataAgendamento}T${selectedSlot.horaInicio}:00`,
        Medico: selectedSlot.medico 
      };

      console.log('[DashboardPage - handleAgendarConsulta] Dados a serem enviados para agendamento:', dadosAgendamento);

      const response = await postAgendamento(dadosAgendamento);
      
      if (response && response.id) {
          alert('Consulta agendada com sucesso! ID: ' + response.id);
          setPaciente('');
          setEspecialidadeAgendamento('');
          setConvenioAgendamento('');
          setDataAgendamento('');
          setMedicoFiltro('');
          setHorarios([]);
          setSelectedSlot(null);
          fetchAgendamentosData();
      } else {
          let errorMessage = 'Erro ao agendar consulta.';
          if (response && response.errors) {
              errorMessage += ' Detalhes: ' + Object.values(response.errors).flat().join(", ");
          } else if (response && response.message) {
              errorMessage += ' Detalhes: ' + response.message;
          }
          alert(errorMessage);
          console.error('[DashboardPage - handleAgendarConsulta] Resposta de erro do backend:', response);
      }
    } catch (err) {
      console.error('[DashboardPage - handleAgendarConsulta] Erro ao agendar consulta (erro de rede/conexão):', err);
      alert('Ocorreu um erro ao agendar a consulta. Por favor, tente novamente ou verifique sua conexão.');
    }
  };

  const handleMarcarAtendimento = async (agendamentoId) => {
    try {
      await postAtendimento({ agendamentoId });
      alert('Atendimento marcado com sucesso!');
      fetchAgendamentosData();
      fetchAtendimentosData();
    } catch (err) {
      console.error('Erro ao marcar atendimento:', err);
      alert('Erro ao marcar atendimento.');
    }
  };

  const renderContent = () => {
    const path = location.pathname;

    if (loading) {
      return <P>Carregando conteúdo da seção...</P>;
    }
    if (error) {
      return <P style={{ color: 'var(--danger-color)' }}>{error}</P>;
    }

    switch (path) {
      case '/':
        return (
          <>
            <H1>Bem-vindo ao MedSchedule!</H1>
            <P>Gerencie seus agendamentos e atendimentos de forma simples e eficiente.</P>
            {formLoading ? (
                <P>Carregando dados para InfoCards...</P>
            ) : formError ? (
                <P style={{ color: 'var(--danger-color)' }}>{formError}</P>
            ) : (
                <InfoCards especialidades={especialidadesInfo} convenios={conveniosInfo} />
            )}
          </>
        );
      case '/agendamento':
        return (
          <>
            <H1>Gerenciar Agendamentos</H1>
            {formLoading ? (
                <P>Carregando formulário de agendamento...</P>
            ) : formError ? (
                <P style={{ color: 'var(--danger-color)' }}>{formError}</P>
            ) : (
                <AgendamentoForm
                  paciente={paciente}
                  setPaciente={setPaciente}
                  especialidadeAgendamento={especialidadeAgendamento}
                  setEspecialidadeAgendamento={handleEspecialidadeChange}
                  especialidades={especialidadesForm}
                  convenioAgendamento={convenioAgendamento}
                  setConvenioAgendamento={setConvenioAgendamento}
                  convenios={conveniosForm}
                  dataAgendamento={dataAgendamento}
                  setDataAgendamento={handleDataChange}
                  medicoFiltro={medicoFiltro}
                  setMedicoFiltro={handleMedicoFiltroChange}
                  horarios={horarios} // Passando os horários com o ID único
                  selectedSlot={selectedSlot}
                  setSelectedSlot={setSelectedSlot}
                  handleVerificarHorarios={handleVerificarHorarios}
                  handleAgendarConsulta={handleAgendarConsulta}
                />
            )}
            
            <H1 style={{ marginTop: 'var(--spacing-xl)' }}>Lista de Agendamentos</H1>
            {agendamentos.length === 0 && !loading && !error ? (
                <P>Nenhum agendamento encontrado.</P>
            ) : (
                <AgendamentosList agendamentos={agendamentos} handleMarcarAtendimento={handleMarcarAtendimento} />
            )}
          </>
        );
      case '/atendimentos':
        return (
          <>
            <H1>Histórico de Atendimentos</H1>
            {atendimentos.length === 0 && !loading && !error ? (
                <P>Nenhum atendimento encontrado.</P>
            ) : (
                <AtendimentosList atendimentos={atendimentos} />
            )}
          </>
        );
      default:
        return (
          <>
            <H1>404 - Página Não Encontrada</H1>
            <P>A seção que você está procurando não existe.</P>
            <P>Que tal voltar para a <a href="/">página inicial</a>?</P>
          </>
        );
    }
  };

  return (
    <>
      {renderContent()}
    </>
  );
}

export default DashboardPage;