-- Cria o banco de dados
CREATE DATABASE hotel_cliente;

-- Usa o banco de dados criado
USE hotel_cliente;

-- Cria a tabela de hotéis
CREATE TABLE hotel (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    endereco TEXT,
    telefone VARCHAR(20),
    email VARCHAR(255),
    estrelas INT CHECK (estrelas >= 1 AND estrelas <= 5)
);

-- Cria a tabela de clientes
CREATE TABLE cliente (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(255)
);

-- Cria a tabela de reservas (opcional, se você quiser adicionar funcionalidades relacionadas a reservas)
CREATE TABLE reserva (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cliente_id BIGINT,
    hotel_id BIGINT,
    data_reserva DATE,
    data_checkin DATE,
    data_checkout DATE,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE CASCADE,
    FOREIGN KEY (hotel_id) REFERENCES hotel(id) ON DELETE CASCADE
);

-- Seleciona todos os registros da tabela hotel
SELECT * FROM hotel;
