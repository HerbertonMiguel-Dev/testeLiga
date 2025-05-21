// medschedule-app/src/api.js

import axios from 'axios';

// Mude de 'http://localhost:5081/api' para o nome do serviço Docker do backend
const API_BASE_URL = 'http://localhost:5081/api'; // <<<<<<< MUDANÇA AQUI!

export const getEspecialidades = async () => {
    const response = await fetch(`${API_BASE_URL}/especialidades`);
    if (!response.ok) throw new Error('Erro ao carregar especialidades.');
    return response.json();
};

export const getConvenios = async () => {
    const response = await fetch(`${API_BASE_URL}/convenios`);
    if (!response.ok) throw new Error('Erro ao carregar convênios.');
    return response.json();
};

export const postDisponibilidade = async (data) => {
    const response = await fetch(`${API_BASE_URL}/disponibilidades/definir`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao definir disponibilidade.');
    }
    return response.json();
};

export const getHorariosDisponiveis = async (data) => {
    const response = await fetch(`${API_BASE_URL}/disponibilidades`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao verificar horários.');
    }
    return response.json();
};

export const postAgendamento = async (data) => {
    const response = await fetch(`${API_BASE_URL}/agendamentos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao agendar consulta.');
    }
    return response.json();
};

export const getAgendamentos = async (params) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/agendamentos?${query}`);
    if (!response.ok) throw new Error('Erro ao carregar agendamentos.');
    return response.json();
};

export const postAtendimento = async (data) => {
    const response = await fetch(`${API_BASE_URL}/atendimentos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao registrar atendimento.');
    }
    return response.json();
};

export const getAtendimentos = async (params) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/atendimentos?${query}`);
    if (!response.ok) throw new Error('Erro ao carregar atendimentos.');
    return response.json();
};