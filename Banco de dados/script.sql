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
    potenciaCV INT,
    imagemURL VARCHAR(255)
);

desc carros;
select * from carros;

INSERT INTO carros (marca, modelo, ano, preco, tipoCambio, tipoCombustivel, portas, consumoCidade, consumoEstrada, potenciaCV, imagemURL) 
VALUES	('Chevrolet', 'Onix', 2023, 75000.00, 'Manual', 'Flex', 4, 13.0, 15.0, 82, NULL),
		('Volkswagen', 'Gol', 2022, 68000.00, 'Manual', 'Flex', 4, 12.5, 14.5, 84, NULL),
		('Hyundai', 'HB20', 2023, 80000.00, 'Automatico', 'Flex', 4, 11.0, 13.0, 88, NULL),
		('Fiat', 'Argo', 2023, 77000.00, 'Manual', 'Flex', 4, 12.0, 14.0, 85, NULL),
		('Toyota', 'Corolla', 2023, 130000.00, 'Automatico', 'Flex', 4, 11.5, 13.5, 139, NULL),
		('Honda', 'Civic', 2022, 125000.00, 'Automatico', 'Gasolina', 4, 10.0, 12.0, 155, NULL),
		('Renault', 'Kwid', 2023, 65000.00, 'Manual', 'Flex', 4, 14.0, 15.5, 70, NULL),
		('Ford', 'Ka', 2021, 60000.00, 'Manual', 'Flex', 4, 13.0, 15.0, 85, NULL),
		('Nissan', 'Versa', 2023, 90000.00, 'Automatico', 'Flex', 4, 12.0, 14.0, 114, NULL),
		('Peugeot', '208', 2022, 85000.00, 'Automatico', 'Flex', 4, 11.5, 13.5, 120, NULL);
