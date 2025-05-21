import React, { useState, useEffect } from 'react';
import {
    Header, Main, Section, CardListContainer, CardList, Form,
    HorariosGrid, HorarioItem, Filters, AtenderButton
} from './styles/AppStyles';
import {
    getEspecialidades, getConvenios, getHorariosDisponiveis, postAgendamento,
    getAgendamentos, postAtendimento, getAtendimentos // Importação correta de getAtendimentos
} from './api';

function App() {
    const [especialidades, setEspecialidades] = useState([]);
    const [convenios, setConvenios] = useState([]);
    const [agendamentos, setAgendamentos] = useState([]);
    const [atendimentos, setAtendimentos] = useState([]); // Descomentado: Estado para listar atendimentos

    // State para o formulário de agendamento
    const [paciente, setPaciente] = useState('');
    const [especialidadeAgendamento, setEspecialidadeAgendamento] = useState('');
    const [convenioAgendamento, setConvenioAgendamento] = useState('');
    const [dataAgendamento, setDataAgendamento] = useState('');
    const [medicoFiltro, setMedicoFiltro] = useState('');
    const [horarios, setHorarios] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);

    // State para filtros de agendamentos
    const [filtroDataInicio, setFiltroDataInicio] = useState('');
    const [filtroDataFim, setFiltroDataFim] = useState('');
    const [filtroPaciente, setFiltroPaciente] = useState('');

    // === ADICIONADO: Estados para filtros de atendimentos ===
    const [filtroAtendimentoDataInicio, setFiltroAtendimentoDataInicio] = useState('');
    const [filtroAtendimentoDataFim, setFiltroAtendimentoDataFim] = useState('');
    const [filtroAtendimentoPaciente, setFiltroAtendimentoPaciente] = useState('');
    // =======================================================

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const esp = await getEspecialidades();
            setEspecialidades(esp);
            const conv = await getConvenios();
            setConvenios(conv);
            const agend = await getAgendamentos({});
            setAgendamentos(agend);
            const aten = await getAtendimentos({}); // Buscando atendimentos iniciais
            setAtendimentos(aten);
        } catch (error) {
            alert('Erro ao carregar dados iniciais: ' + error.message);
            console.error('Erro ao carregar dados iniciais:', error);
        }
    };

    const handleVerificarHorarios = async () => {
        if (!especialidadeAgendamento || !dataAgendamento) {
            alert('Por favor, selecione a especialidade e a data.');
            return;
        }
        try {
            const data = {
                especialidadeId: parseInt(especialidadeAgendamento),
                data: dataAgendamento + 'T00:00:00',
                medico: medicoFiltro || undefined
            };
            const fetchedHorarios = await getHorariosDisponiveis(data);
            setHorarios(fetchedHorarios);
            setSelectedSlot(null);
        } catch (error) {
            alert('Erro ao verificar horários: ' + error.message);
            console.error('Erro ao verificar horários:', error);
            setHorarios([]);
        }
    };

    const handleAgendarConsulta = async () => {
        if (!paciente || !especialidadeAgendamento || !convenioAgendamento || !dataAgendamento || !selectedSlot) {
            alert('Por favor, preencha todos os campos e selecione um horário disponível.');
            return;
        }

        try {
            const dataHoraCompleta = `${dataAgendamento}T${selectedSlot.horaInicio}:00`;
            const newAgendamento = {
                paciente,
                especialidadeId: parseInt(especialidadeAgendamento),
                convenioId: parseInt(convenioAgendamento),
                dataHora: dataHoraCompleta,
                medico: selectedSlot.medico
            };
            const response = await postAgendamento(newAgendamento);
            alert(`Consulta agendada com sucesso! ID: ${response.id}, Médico: ${response.medico}, Data/Hora: ${new Date(response.dataHora).toLocaleString('pt-BR')}`);

            setPaciente('');
            setEspecialidadeAgendamento('');
            setConvenioAgendamento('');
            setDataAgendamento('');
            setMedicoFiltro('');
            setHorarios([]);
            setSelectedSlot(null);
            fetchData();
        } catch (error) {
            alert('Erro ao agendar consulta: ' + error.message);
            console.error('Erro ao agendar consulta:', error);
            if (error.response && error.response.data) {
                console.error("Detalhes do erro do backend:", error.response.data);
                if (error.response.data.errors) {
                    let errorMessages = "";
                    for (const key in error.response.data.errors) {
                        errorMessages += `${key}: ${error.response.data.errors[key].join(", ")}\n`;
                    }
                    alert("Erros de validação:\n" + errorMessages);
                } else if (error.response.data.message) {
                    alert(error.response.data.message);
                }
            }
        }
    };

    const handleMarcarAtendimento = async (agendamentoId) => {
        const observacoes = prompt('Observações do atendimento (opcional):');
        try {
            await postAtendimento({ agendamentoId, observacoes: observacoes || '' });
            alert('Atendimento registrado com sucesso!');

            // 1. Atualizar o estado 'agendamentos' localmente
            setAgendamentos(prevAgendamentos =>
                prevAgendamentos.map(ag =>
                    ag.id === agendamentoId ? { ...ag, HasAtendimento: true } : ag
                )
            );

            // 2. Se a seção de atendimentos realizados também precisa ser atualizada imediatamente:
            // Você pode refetch apenas os atendimentos ou adicionar o novo atendimento ao estado 'atendimentos'
            const updatedAtendimentos = await getAtendimentos({}); // Refetch dos atendimentos para garantir consistência
            setAtendimentos(updatedAtendimentos);

            // Opcional: Se ainda houver problemas, force um refetch completo
            // fetchData(); 

        } catch (error) {
            alert('Erro ao registrar atendimento: ' + error.message);
            console.error('Erro ao registrar atendimento:', error);
        }
    };

    const handleFiltrarAgendamentos = async () => {
        const params = {};
        if (filtroDataInicio) params.dataInicio = filtroDataInicio;
        if (filtroDataFim) params.dataFim = filtroDataFim;
        if (filtroPaciente) params.paciente = filtroPaciente;
        try {
            const filteredAgendamentos = await getAgendamentos(params);
            setAgendamentos(filteredAgendamentos);
        } catch (error) {
            alert('Erro ao filtrar agendamentos: ' + error.message);
            console.error('Erro ao filtrar agendamentos:', error);
        }
    };

    // === ADICIONADO: Função para filtrar atendimentos ===
    const handleFiltrarAtendimentos = async () => {
        const params = {};
        if (filtroAtendimentoDataInicio) params.dataInicio = filtroAtendimentoDataInicio;
        if (filtroAtendimentoDataFim) params.dataFim = filtroAtendimentoDataFim;
        if (filtroAtendimentoPaciente) params.paciente = filtroAtendimentoPaciente;
        try {
            const filteredAtendimentos = await getAtendimentos(params);
            setAtendimentos(filteredAtendimentos);
        } catch (error) {
            alert('Erro ao filtrar atendimentos: ' + error.message);
            console.error('Erro ao filtrar atendimentos:', error);
        }
    };
    // ==================================================

    return (
        <>
            <Header>
                <h1>Sistema de Agendamento Médico</h1>
            </Header>

            <Main>
                <Section>
                    <h2>Especialidades e Convênios</h2>
                    <CardListContainer>
                        <CardList>
                            <h3>Especialidades</h3>
                            <ul id="lista-especialidades">
                                {especialidades.map(esp => (
                                    <li key={esp.id}>{esp.nome}</li>
                                ))}
                            </ul>
                        </CardList>
                        <CardList>
                            <h3>Convênios</h3>
                            <ul id="lista-convenios">
                                {convenios.map(conv => (
                                    <li key={conv.id} value={conv.id}>{conv.nome}</li>
                                ))}
                            </ul>
                        </CardList>
                    </CardListContainer>
                </Section>

                <Section>
                    <h2>Agendar Nova Consulta</h2>
                    <Form>
                        <div className="form-group">
                            <label htmlFor="paciente">Nome do Paciente:</label>
                            <input type="text" id="paciente" value={paciente} onChange={(e) => setPaciente(e.target.value)} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="especialidade-agendamento">Especialidade:</label>
                            <select id="especialidade-agendamento" value={especialidadeAgendamento} onChange={(e) => { setEspecialidadeAgendamento(e.target.value); setHorarios([]); setSelectedSlot(null); }} required>
                                <option value="">Selecione uma especialidade</option>
                                {especialidades.map(esp => (
                                    <option key={esp.id} value={esp.id}>{esp.nome}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="convenio-agendamento">Convênio:</label>
                            <select id="convenio-agendamento" value={convenioAgendamento} onChange={(e) => setConvenioAgendamento(e.target.value)} required>
                                <option value="">Selecione um convênio</option>
                                {convenios.map(conv => (
                                    <option key={conv.id} value={conv.id}>{conv.nome}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="data-agendamento">Data da Consulta:</label>
                            <input type="date" id="data-agendamento" value={dataAgendamento} onChange={(e) => { setDataAgendamento(e.target.value); setHorarios([]); setSelectedSlot(null); }} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="medico-filtro">Filtrar por Médico (opcional):</label>
                            <input type="text" id="medico-filtro" placeholder="Nome do Médico" value={medicoFiltro} onChange={(e) => { setMedicoFiltro(e.target.value); setHorarios([]); setSelectedSlot(null); }} />
                        </div>

                        <button type="button" onClick={handleVerificarHorarios}>Verificar Horários Disponíveis</button>

                        <HorariosGrid>
                            {horarios.map((h) => (
                                <HorarioItem
                                    key={`${h.horaInicio}-${h.medico}`}
                                    className={`${h.disponivel ? '' : 'ocupado'} ${selectedSlot?.horaInicio === h.horaInicio && selectedSlot?.medico === h.medico
                                        ? 'selecionado'
                                        : ''
                                        }`}
                                    onClick={() => h.disponivel && setSelectedSlot(h)}
                                    title={h.disponivel ? '' : `Ocupado por: ${h.paciente || 'Desconhecido'} (Agendamento #${h.agendamentoId || 'N/A'})`}
                                >
                                    <span>{h.horaInicio} - {h.horaFim}</span>
                                    <small>{h.disponivel ? h.medico : `Ocupado${h.paciente ? ` por ${h.paciente}` : ''}`}</small>
                                </HorarioItem>
                            ))}
                        </HorariosGrid>

                        <button type="button" onClick={handleAgendarConsulta} disabled={!selectedSlot}>Agendar Consulta</button>
                    </Form>
                </Section>

                <Section>
                    <h2>Agendamentos Existentes</h2>
                    <Filters>
                        <label htmlFor="filtro-data-inicio">Data Início:</label>
                        <input type="date" id="filtro-data-inicio" value={filtroDataInicio} onChange={(e) => setFiltroDataInicio(e.target.value)} />
                        <label htmlFor="filtro-data-fim">Data Fim:</label>
                        <input type="date" id="filtro-data-fim" value={filtroDataFim} onChange={(e) => setFiltroDataFim(e.target.value)} />
                        <label htmlFor="filtro-paciente">Paciente:</label>
                        <input type="text" id="filtro-paciente" value={filtroPaciente} onChange={(e) => setFiltroPaciente(e.target.value)} placeholder="Nome do Paciente" />
                        <button onClick={handleFiltrarAgendamentos}>Filtrar</button>
                    </Filters>
                    <table>
                        <thead>
                            <tr>
                                <th>Paciente</th>
                                <th>Especialidade</th>
                                <th>Convênio</th>
                                <th>Data/Hora</th>
                                <th>Médico</th>
                                <th>Atendido</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agendamentos.length === 0 ? (
                                <tr><td colSpan="7">Nenhum agendamento encontrado.</td></tr>
                            ) : (
                                agendamentos.map(ag => (
                                    <tr key={ag.id}>
                                        <td data-label="Paciente">{ag.paciente}</td> {/* Adicionado data-label */}
                                        <td data-label="Especialidade">{ag.especialidadeNome}</td> {/* Adicionado data-label */}
                                        <td data-label="Convênio">{ag.convenioNome}</td> {/* Adicionado data-label */}
                                        <td data-label="Data/Hora">{new Date(ag.dataHora).toLocaleString('pt-BR')}</td> {/* Adicionado data-label */}
                                        <td data-label="Médico">{ag.medico}</td> {/* Adicionado data-label */}
                                        <td data-label="Atendido">{ag.HasAtendimento ? 'Sim' : 'Não'}</td> {/* Adicionado data-label */}
                                        <td data-label="Ações"> {/* Adicionado data-label */}
                                            {!ag.HasAtendimento && (
                                                <AtenderButton onClick={() => handleMarcarAtendimento(ag.id)}>Atender</AtenderButton>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </Section>

                {/* Seção de Atendimentos Realizados - AGORA DESCOMENTADA */}
                <Section>
                    <h2>Atendimentos Realizados</h2>
                    <Filters>
                        <label htmlFor="filtro-atendimento-data-inicio">Data Início:</label>
                        <input type="date" id="filtro-atendimento-data-inicio" value={filtroAtendimentoDataInicio} onChange={(e) => setFiltroAtendimentoDataInicio(e.target.value)} />
                        <label htmlFor="filtro-atendimento-data-fim">Data Fim:</label>
                        <input type="date" id="filtro-atendimento-data-fim" value={filtroAtendimentoDataFim} onChange={(e) => setFiltroAtendimentoDataFim(e.target.value)} />
                        <label htmlFor="filtro-atendimento-paciente">Paciente:</label>
                        <input type="text" id="filtro-atendimento-paciente" value={filtroAtendimentoPaciente} onChange={(e) => setFiltroAtendimentoPaciente(e.target.value)} placeholder="Nome do Paciente" />
                        <button onClick={handleFiltrarAtendimentos}>Filtrar</button>
                    </Filters>
                    <table>
                        <thead>
                            <tr>
                                <th>ID Agendamento</th>
                                <th>Paciente</th>
                                <th>Médico</th>
                                <th>Data Atendimento</th>
                                <th>Observações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {atendimentos.length === 0 ? (
                                <tr><td colSpan="5">Nenhum atendimento encontrado.</td></tr>
                            ) : (
                                atendimentos.map(at => (
                                    <tr key={at.id}>
                                        <td data-label="ID Agendamento">{at.agendamentoId}</td> {/* Adicionado data-label */}
                                        <td data-label="Paciente">{at.agendamento?.paciente || 'N/A'}</td> {/* Adicionado data-label */}
                                        <td data-label="Médico">{at.agendamento?.medico || 'N/A'}</td> {/* Adicionado data-label */}
                                        <td data-label="Data Atendimento">{new Date(at.dataAtendimento).toLocaleString('pt-BR')}</td> {/* Adicionado data-label */}
                                        <td data-label="Observações">{at.observacoes}</td> {/* Adicionado data-label */}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </Section>
            </Main>
        </>
    );
}

export default App;