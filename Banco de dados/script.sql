DROP DATABASE IF EXISTS carsLife;
CREATE DATABASE carsLife;
USE carsLife;
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    senha VARCHAR(255),
    dtNasc DATE,
    dtCadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE preferencias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fkUsuario INT NOT NULL,
    orcamentoMin DECIMAL(10,2),
    orcamentoMax DECIMAL(10,2),
    tipoCambio VARCHAR(20) CHECK (tipoCambio IN ('Manual', 'Automatico', 'Tanto faz')),
    anoMinimo INT,
    CONSTRAINT fkUsuarioPref FOREIGN KEY (fkUsuario) REFERENCES usuarios(id)
);

CREATE TABLE tipoUso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fkUsuario INT NOT NULL,
    trabalho INT,
    diaADia INT,
    viagem INT,
    trabalhoComCarro INT,
    CONSTRAINT fkUsuarioTipoUso FOREIGN KEY (fkUsuario) REFERENCES usuarios(id)
);

CREATE TABLE prioridades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fkUsuario INT NOT NULL,
    economia INT,
    manutencao INT,
    seguranca INT,
    design INT,
    espaco INT,
    revenda INT,
    desempenho INT,
    CONSTRAINT fkUsuarioPrioridade FOREIGN KEY (fkUsuario) REFERENCES usuarios(id)
);

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

create view vw_preferencias as
select 	pre.orcamentoMin AS orcMin, pre.orcamentoMax AS orcMax, pre.tipoCambio AS cambio, pre.anoMinimo AS anoMin, 
		tu.trabalho AS trabalho, tu.diaADia AS diadia, tu.viagem AS viagem, tu.trabalhoComCarro AS trabalhoCar,
		pri.economia AS eco, pri.manutencao seguranca, pri.design AS design, pri.espaco AS espaço, pri.revenda As revenda, pri.desempenho AS desempenho
from  preferencias pre 
inner join usuarios u on pre.fkUsuario = u.id
inner join tipoUso tu on tu.fkUsuario = u.id
inner join prioridades pri on pri.fkUsuario = u.id;
desc prioridades;



