CREATE DATABASE carsLife;
USE carsLife;
 
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    dtNasc DATE
);

CREATE TABLE preferenciasUsuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fkUsuario INT,
    orcamentoMin DECIMAL(10,2),
    orcamentoMax DECIMAL(10,2),
    tipoCambio VARCHAR(20) CHECK (tipoCambio IN ('Manual', 'Automatico', 'Tanto faz')),
    anoMinimo INT,    
    CONSTRAINT FOREIGN KEY (fkUsuario) REFERENCES usuarios(id)
);

CREATE TABLE tiposUso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(100)
);

INSERT INTO tiposUso (descricao) 
VALUES	('Trabalho'),
		('Dia a dia'),
		('Viagens'),
		('Trabalho com carro (Uber, entregas, etc.)');

CREATE TABLE preferenciasTipoUso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fkUsuario INT,
    fkTipoUso INT,
    CONSTRAINT FOREIGN KEY (fkUsuario) REFERENCES usuarios(id),
    CONSTRAINT FOREIGN KEY (fkTipoUso) REFERENCES tiposUso(id)
);

CREATE TABLE prioridades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(100)
);

INSERT INTO prioridades (descricao) 
VALUES	('Economia de combustível'),
		('Baixa manutenção'),
		('Segurança'),
		('Design'),
		('Espaço interno'),
		('Facilidade de revenda'),
		('Desempenho');
        
CREATE TABLE prioridadesUsuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fkUsuario INT,
    fkPrioridade INT,
    CONSTRAINT fkUsuarioPrioridade FOREIGN KEY (fkUsuario) REFERENCES usuarios(id),
    CONSTRAINT fkPrioridade FOREIGN KEY (fkPrioridade) REFERENCES prioridades(id)
);

-- Carros
CREATE TABLE carros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(50),
    modelo VARCHAR(100),
    ano INT,
    preco DECIMAL(10,2),
    tipoCambio VARCHAR(20) CHECK (tipoCambio IN ('Manual', 'Automatico')),
    tipoCombustivel VARCHAR(20) CHECK (tipoCombustivel IN ('Flex', 'Gasolina', 'Etanol', 'GNV', 'Eletrico')),
    portas INT CHECK (portas IN (2, 4)),
    consumoCidade DECIMAL(5,2), -- km/l ou kWh/100km
    consumoEstrada DECIMAL(5,2),
    potenciaCV INT
);