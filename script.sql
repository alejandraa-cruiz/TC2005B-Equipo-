CREATE DATABASE project_nexus; 
USE project_nexus;

CREATE TABLE project (
  id_project INT PRIMARY KEY AUTO_INCREMENT,
  project_name VARCHAR(100),
  project_status VARCHAR(200),
  start_date DATE,
  end_date DATE
);

CREATE TABLE epic (
  id_epic INT PRIMARY KEY AUTO_INCREMENT,
  id_project INT,
  epic_link VARCHAR(16)
);

CREATE TABLE ticket (
  id_ticket INT PRIMARY KEY AUTO_INCREMENT,
  id_epic INT,
  issueKey VARCHAR(16),
  summary VARCHAR(255),
  issue_type VARCHAR(10),
  storyPonts TINYINT,
  ticket_status VARCHAR(20),
  label VARCHAR(10),
  update_date TIMESTAMP
);

CREATE TABLE project_teamMember (
  id_project INT,
  id_team_member INT,
  agile_points TINYINT,
  PRIMARY KEY(id_project, id_team_member)
);

CREATE TABLE teamMember (
  id_team_member INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255),
  member_name VARCHAR(50),
  team VARCHAR(2)
);

CREATE TABLE csv (
  id_csv INT PRIMARY KEY AUTO_INCREMENT,
  id_team_member INT,
  id_sprint INT,
  file_path VARCHAR(255),
  upload_date TIMESTAMP
);



/* Carga de datos */


ALTER TABLE epic 
ADD CONSTRAINT id_projectFK FOREIGN KEY (id_project) REFERENCES project (id_project) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE ticket 
ADD CONSTRAINT id_epicFK FOREIGN KEY (id_epic) REFERENCES epic (id_epic) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE project_teamMember
ADD CONSTRAINT id_projectFK FOREIGN KEY (id_project) REFERENCES project (id_project) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT id_team_memberFK FOREIGN KEY (id_team_member) REFERENCES teamMember (id_team_member) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE csv
ADD CONSTRAINT id_team_memberFK FOREIGN KEY (id_team_member) REFERENCES teamMember (id_team_member) ON DELETE CASCADE ON UPDATE CASCADE;
