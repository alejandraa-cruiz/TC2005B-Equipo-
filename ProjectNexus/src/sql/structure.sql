DROP DATABASE IF EXISTS project_nexus;
CREATE DATABASE project_nexus; 
USE project_nexus;

CREATE TABLE project (
  id_project INT PRIMARY KEY AUTO_INCREMENT,
  project_name VARCHAR(100),
  start_date DATE,
  end_date DATE NOT NULL
);

CREATE TABLE epic (
  id_epic INT PRIMARY KEY AUTO_INCREMENT,
  id_project INT DEFAULT NULL,
  epic_link VARCHAR(16),
  epic_title VARCHAR(100)
);

CREATE TABLE ticket (
  id_ticket INT PRIMARY KEY AUTO_INCREMENT,
  id_epic INT,
  issueKey VARCHAR(16),
  summary VARCHAR(255),
  issue_type VARCHAR(10),
  storyPoints FLOAT,
  ticket_status VARCHAR(20),
  label VARCHAR(40),
  update_date TIMESTAMP
);

CREATE TABLE project_teamMember (
  id_project INT,
  id_team_member INT,
  agile_points FLOAT,
  PRIMARY KEY(id_project, id_team_member)
);

CREATE TABLE teamMember (
  id_team_member INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  member_name VARCHAR(50) NOT NULL,
  team VARCHAR(2) NOT NULL
);

CREATE TABLE csv (
  id_csv INT PRIMARY KEY AUTO_INCREMENT,
  id_team_member INT,
  id_sprint INT,
  file_path VARCHAR(255),
  upload_date TIMESTAMP
);

/* Carga de datos */

INSERT INTO teamMember (member_name, email, team) VALUES
('Antonio Antillon','antonio_antillon@dispatchhealth.com', 'BE'),
('Kevin Anderson','kevin_anderson@dispatchhealth.com', 'FE'),
('Dan Cohn','dan_cohn@dispatchhealth.com', 'BE'),
('Bernardo Gomez-Romero', 'bernardo_gomez_romero@dispatchhealth.com', 'BE'),
('Giorgi Gelashvili', 'giorgi_gelashvili@dispatchhealth.com', 'FE'),
('Alan Malagon', 'alan_malagon@dispatchhealth.com', 'FE'),
('Itzel Barreto', 'itzel_barreto@dispatchhealth.com', 'FE');


INSERT INTO csv (id_team_member, id_sprint, file_path, upload_date) VALUES
(4, null, './uploads/Jira.csv', '2023-03-10 14:17:00');

INSERT INTO project (project_name, start_date, end_date) VALUES 
('FJDH', '2023-02-01', '2023-03-28');

INSERT INTO epic (id_project, epic_link, epic_title) VALUES 
(1, 'PART-234', 'Express Tech Excellence'),
(1, 'PART-289', 'NSE - P4'),
(1, 'PART-306', 'Single Sign On V2 - Super Admin configuration UI'),
(1, 'PART-312', 'SSO - V3 - User Management and Auth0 Automation');

INSERT INTO project_teamMember (id_project, id_team_member, agile_points) VALUES 
(1, 1, 6),
(1, 2, 9),
(1, 3, 8),
(1, 4, 9),
(1, 5, 8),
(1, 6, 8),
(1, 7, 9);

INSERT INTO ticket (id_epic, issueKey, summary, issue_type, storyPoints, ticket_status, label , update_date) VALUES
(1, 'PART-2346', 'Standardize the use of error key in the backend failure responses', 'Task', 1, 'To Do', null, '2023-03-09 12:28:00'),
(1, 'PART-2342', 'Add Swagger docs for GET care requests endpoints (show and index)', 'Task', 2, 'To Do', 'part/Backend', '2023-03-09 11:57:00'),
(1, 'PART-2341', 'Rake task for deleting partners', 'Task', 2, 'To Do', null, '2023-03-08 15:04:00'),
(1, 'PART-2336', 'Demote MarketStatus::Nearest error messages to warn messages in logs', 'Task', 2, 'To Do', null, '2023-03-07 19:55:00'),
(1, 'PART-2335', 'Flaky ruby spec on CareRequest Query service', 'Task', 3, 'To Do', null, '2023-03-07 14:07:00'),
(1, 'PART-2334', 'Fix Flaky Test : PartnerInformationPage - bypass risk option', 'Task', 3, 'Code Review', 'part/Frontend', '2023-03-10 13:57:00'),
(1, 'PART-2330', 'FE: Fix Flaky Test : SummaryCard & PartnerInformationPage', 'Task', 4, 'Canceled', null, '2023-03-09 14:43:00'),
(1, 'PART-2326', 'Integration Test - Care Requests Page Filter Menu Click Away', 'Task', 4, 'To Do', 'part/Frontend', '2023-03-10 13:57:00'),
(1, 'PART-2296', 'Add bundle back to dockerfile', 'Story', 7, 'To Do', null, '2023-03-07 07:34:00'),
(1, 'PART-2293', 'Remove cron from Procfile and remove Aptible services', 'Story', 8, 'Done', null, '2023-03-02 09:39:00'),
(1, 'PART-137',  'Move frontend configuration variables to single Statsig dynamic config', 'Task', 8, 'In Progress', 'part/Frontend', '2023-02-28 12:32:00'),
(1, 'PART-129',  'FE: update theme', 'Task', 8, 'Done', null, '2023-02-27 10:54:00'),
(1, 'PART-120',  'FE: fix data dog test / refactor setupTest', 'Task', 8, 'To Do', null, '2023-02-24 14:47:00'),
(1, 'PART-115',  'Configure UAT for Cypress e2e', 'Task', 7, 'To Do', null, '2023-03-02 14:01:00'),
(1, 'PART-114',  'Set Datadog RUM config from statsig context', 'Task', 6, 'To Do', 'part/Frontend', '2023-03-07 07:35:00'),
(1, 'PART-112',  'Flaky Source requests spec', 'Bug', 4, 'To Do', 'part/tech-debt', '2023-02-24 14:45:00'),
(1, 'PART-111',  'Map the values from the design to the theme', 'Task', 3, 'To Do', 'part/Frontend', '2023-02-24 14:47:00'),
(1, 'PART-110',  'Custom hook to detect a device type (isMobile, isTablet, isDesktop)', 'Task', 2, 'To Do', 'part/Frontend', '2023-02-24 14:47:00'),
(1, 'PART-109',  'Fix More Flaky  JS Tests in PartnerInformationPage', 'Task', 2, 'Done', null, '2023-03-02 07:23:00'),
(1, 'PART-108',  'FE: add no focused tests lint rule', 'Task', 3, 'To Do', null, '2023-02-24 14:48:00'),
(1, 'PART-106',  'Remove flag (BE) - partner_express_nse_v3_enabled', 'Task', 3, 'To Do', 'part/Backend', '2023-03-09 11:59:00'),
(1, 'PART-105',  'Remove flag (FE) - partner_express_nse_v3_enabled', 'Task', 3, 'To Do', 'part/Frontend', '2023-03-07 07:23:00'),
(1, 'PART-104',  'Remove flag (BE) - pop_health_service', 'Task', 6, 'To Do', 'part/Backend', '2023-03-02 13:42:00'),
(1, 'PART-103',  'Remove flag (FE) - risk_strat_bypass_express', 'Task', 6, 'Canceled', 'part/Frontend', '2023-03-02 14:10:00'),
(1, 'PART-102',  'Add alphabetical ordering to partner and users lists (backend)', 'Task', 7, 'Done', 'part/Backend', '2023-03-10 11:30:00'),
(1, 'PART-97',   'Deprecate useCareRequest and useCareRequestsSearch hooks', 'Task', 7, 'To Do', null, '2023-02-24 14:47:00'),
(1, 'PART-96',   'Add tests to AccessModal.jsx', 'Task', 7, 'To Do', 'part/Frontend', '2023-02-24 14:47:00'),
(1, 'PART-94',   'Frontend tests: Parallelize and randomize', 'Task', 9, 'To Do', 'part/Frontend', '2023-02-24 14:47:00'),
(1, 'PART-93',   'Frontend specs spike: investigate how we can speed up our specs', 'Task', 9, 'To Do', 'part/Frontend', '2023-02-24 14:47:00'),
(1, 'PART-92',   'Backend refactor to risk strat bypass implementation', 'Task', 8, 'To Do', 'part/Backend', '2023-02-24 14:48:00'),
(1, 'PART-91',   'TechDebt: Eager loading associations in queries', 'Task', 1, 'To Do', 'part/tech-debt', '2023-02-24 14:47:00'),
(1, 'PART-83',   'GitHub pr template: feature gate & pic/vid checkbox', 'Task', 1, 'Done', null, '2023-03-06 15:06:00'),
(1, 'PART-81',   'Refactor the finalize care - risk strat bypass implementation', 'Task', 2, 'To Do', 'part/Frontend', '2023-03-07 07:33:00'),
(1, 'PART-79',   'Lint FE on CI - phase 1', 'Task', 1, 'To Do', 'part/Frontend', '2023-03-10 13:59:00'),
(1, 'PART-76',   'FE: add jest-mock-extended library - testing with TS easily', 'Task', 2, 'To Do', null, '2023-02-24 14:47:00'),
(1, 'PART-69',   'Optimize paginated care request queries (memory)', 'Task', 3, 'To Do', 'part/Backend', '2023-02-24 14:47:00'),
(1, 'PART-66',   'Configure CI devDependencies', 'Task', 4, 'To Do', null, '2023-03-02 14:15:00'),
(1, 'PART-410',  'FE: align our types packages with the packages we use (versions)', 'Task', 4, 'To Do', null, '2023-02-24 14:48:00'),
(1, 'PART-408',  'FE: upgrade "react router"', 'Task', 3, 'To Do', null, '2023-02-24 14:48:00'),
(1, 'PART-407',  'FE: upgrade "cypress"', 'Task', 5, 'To Do', null, '2023-02-24 14:48:00'),
(1, 'PART-406',  'FE: upgrade "@testing-library/user-event"', 'Task', 5, 'To Do', null, '2023-02-24 14:48:00'),
(1, 'PART-405',  'FE: upgrade "@testing-library/react-hooks"', 'Task', 3, 'To Do', null, '2023-02-24 14:48:00'),
(1, 'PART-404',  'FE: upgrade "@testing-library/react"', 'Task', 6, 'To Do', null, '2023-02-24 14:48:00'),
(1, 'PART-403',  'FE: upgrade "@testing-library/cypress"', 'Task', 6, 'To Do', null, '2023-02-24 14:48:00'),
(1, 'PART-397',  'Upgrade React Scripts package', 'Task', 5, 'To Do', 'part/Frontend', '2023-03-10 13:59:00'),
(1, 'PART-395',  'Tech Excellence FE : replace Express theme with DS theme', 'Task', 7, 'To Do', null, '2023-02-24 14:48:00'),
(1, 'PART-394',  'Tech Excellence FE : swap MUI for DS components', 'Task', 7, 'To Do', null, '2023-02-24 14:48:00'),
(1, 'PART-393',  'Tech Excellence FE : migrate MUI from v4 to v5', 'Task', 1, 'To Do', 'part/Frontend', '2023-03-10 14:00:00'),
(1, 'PART-391',  'Tech Excellence: fix InputWithChips test warnings', 'Task', 1, 'To Do', null, '2023-02-24 14:48:00'),
(1, 'PART-390',  'Tech Excellence: fix PrivateRoute test/prop warnings', 'Task', 1, 'To Do', null, '2023-02-24 14:48:00'),
(1, 'PART-389',  'Tech Excellence: fix HashRouter warning', 'Task', 2, 'To Do', null, '2023-02-24 14:48:00'),
(1, 'PART-388',  'Tech Excellence: replace createReducer with builder callback RTK', 'Task', 2, 'To Do', null, '2023-02-24 14:48:00'),
(1, 'PART-372',  'Code cleanup: remove old partner form (frontend)', 'Task', 2, 'To Do', 'part/Frontend', '2023-02-24 14:48:00'),
(1, 'PART-371',  'Code cleanup: remove partner.genesys_email from frontend', 'Task', 3, 'To Do', 'part/Frontend', '2023-02-24 14:48:00'),
(1, 'PART-353',  'Refactor ChiefComplaint to use Formik', 'Task', 4, 'To Do', 'part/Frontend', '2023-02-24 14:48:00'),
(1, 'PART-342',  'Implement Slack alerts triggered by Datadog logs on Express', 'Task', 5, 'To Do', 'part/Backend', '2023-03-07 07:25:00'),
(1, 'PART-337',  'Implement custom randomized sequencer for FE tests', 'Task', 6, 'To Do', 'part/Frontend', '2023-02-24 14:48:00'),
(1, 'PART-328',  'Remove all usages of "||" (or operator) related to partnerId', 'Task', 7, 'To Do', 'part/Frontend', '2023-02-24 14:48:00'),
(1, 'PART-327',  'Remove old Rollout Popup Banner', 'Task', 8, 'To Do', 'part/Frontend', '2023-02-24 14:48:00'),
(1, 'PART-309',  'Fix flaky tests in backend: markets_swagger_spec.rb:24', 'Task', 9, 'To Do', 'part/Backend', '2023-03-07 07:39:00'),
(1, 'PART-259',  'Investigate: Cron job overrunning allocated resources (remove cron)', 'Task', 9, 'Done', 'part/Backend', '2023-02-24 15:12:00'),
(1, 'PART-231',  'Frontend: Call only status service', 'Task', 8, 'To Do', 'part/Frontend', '2023-02-27 10:23:00'),
(1, 'PART-229',  'Use Formik in the partner add and edit market component', 'Story', 7, 'To Do', null, '2023-02-27 10:23:00'),
(1, 'PART-236',  'Express client-side logging', 'Task', 6, 'Code Review', 'part/Frontend', '2023-02-27 10:23:00'),
(1, 'PART-235',  'Fix Dependabot alerts', 'Task', 5, 'To Do', 'part/Backend', '2023-02-24 14:47:00'),
(1, 'PART-191',  'Database problems - Clean up care request', 'Task', 4, 'Canceled', null, '2023-03-02 14:05:00'),
(1, 'PART-190',  'Database problems - Clean up care request statuses', 'Task', 4, 'To Do', null, '2023-03-02 14:05:00'),
(1, 'PART-180',  'Client: add location, channel and all_status endpoints to MSW', 'Task', 3, 'To Do', 'part/Frontend', '2023-03-02 13:49:00'),

(2, 'PART-2343', 'Change care request index data: return summary view instead of normal view', 'Task', 3, 'Code Review', 'part/Backend', '2023-03-10 11:30:00'),
(2, 'PART-2322', 'Data migration to update old symptoms to have the new separator ("|" to " | ")', 'Task', 4, 'Release Ready', 'part/Backend', '2023-03-09 13:00:00'),
(2, 'PART-2294', 'Complete response data for the care request', 'Task', 6, 'Done', 'backend', '2023-03-10 11:30:00'),
(2, 'PART-133', 'Create UI filter: by patient name', 'Task', 7, 'In Progress', 'part/Frontend', '2023-03-10 11:41:00'),
(2, 'PART-77', 'Care Requests Page - Filters - Clear All Button', 'Task', 2, 'Done', null, '2023-03-02 07:24:00'),
(2, 'PART-348', 'Care Requests Page - Filter - Sources', 'Task', 3, 'Done', 'part/Frontend', '2023-03-10 13:15:00'),
(2, 'PART-347', 'Care Requests Page - Filters - Service Line', 'Task', 5, 'Done', 'part/Frontend', '2023-02-27 11:58:00'),
(2, 'PART-346', 'Care Requests Page - add Markets Filter', 'Task', 6, 'Done', 'part/Frontend', '2023-03-10 13:15:00'),
(2, 'PART-345', 'Create UI filter: past care requests', 'Story', 7, 'Code Review', 'part/Frontend', '2023-03-10 07:24:00'),
(2, 'PART-343', 'Create filter UI: my care requests', 'Task', 8, 'To Do', 'part/Frontend', '2023-02-28 12:32:00'),
(2, 'PART-335', 'Care Requests Page - row expand- Summary', 'Task', 9, 'Code Review', 'part/Frontend', '2023-03-10 14:03:00'),
(2, 'PART-333', 'Care Requests Page - row expand -  case details ', 'Task', 1, 'In Progress', 'part/Frontend', '2023-03-08 12:51:00'),
(2, 'PART-292', 'New care request filters', 'Story', 3, 'To Do', 'part/nse', '2023-02-28 12:19:00'),
(2, 'PART-290', 'New expanded care request details design', 'Story', 1, 'In Progress', 'part/Frontend', '2023-03-09 11:53:00'),

(3, 'PART-366', 'Configure our own SSO IdP environment for QA', 'Task', 3, 'Done', 'part/Backend', '2023-02-28 12:43:00'),
(3, 'PART-360', 'Add SAMLP add on to auth0 clients', 'Task', 4, 'Code Review', 'part/par-express-sso', '2023-02-27 10:45:00'),
(3, 'PART-356', 'Change SSO users "default source" label to just "source"', 'Bug', 6, 'To Do', 'part/Frontend', '2023-02-24 14:46:00'),
(3, 'PART-352', 'UI: allow SSO admins and super to modify source and phone fields for users', 'Story', 6, 'To Do', 'part/Frontend', '2023-02-27 10:25:00'),
(3, 'PART-313', 'UI: Create progress bar for partner creation', 'Task', 8, 'To Do', 'part/Frontend', '2023-02-27 10:25:00'),
(3, 'PART-305', 'Update an existing partner to be SSO', 'Story', 9, 'To Do', null, '2023-02-27 10:25:00'),
(3, 'PART-304', 'Create a partner configured for SSO', 'Story', 6, 'To Do', null, '2023-02-27 10:25:00'),
(3, 'PART-284', 'UI: add SSO connection name field to Partner Info', 'Task', 5, 'To Do', 'part/Frontend', '2023-02-27 10:25:00'),
(3, 'PART-283', 'UI: add toggle to Partner Info page to enable/disable SSO', 'Task', 4, 'To Do', 'part/Frontend', '2023-02-27 10:25:00'),

(4, 'PART-295', 'UI: Add toggle in partners SSO config to enable user management control', 'Story', 6, 'To Do', 'part/Frontend', '2023-02-24 14:46:00'),
(4, 'PART-267', 'Update invitation workflow, are SSO users pending until first successful login?', 'Task', 9, 'To Do', null, '2023-02-24 14:48:00');

/* ************** */


ALTER TABLE epic 
ADD CONSTRAINT id_projectFK FOREIGN KEY (id_project) REFERENCES project (id_project) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE ticket 
ADD CONSTRAINT id_epicFK FOREIGN KEY (id_epic) REFERENCES epic (id_epic) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE project_teamMember
ADD CONSTRAINT id_projectFKprojTM FOREIGN KEY (id_project) REFERENCES project (id_project) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT id_team_memberFKprojTM FOREIGN KEY (id_team_member) REFERENCES teamMember (id_team_member) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE csv
ADD CONSTRAINT id_team_memberFK FOREIGN KEY (id_team_member) REFERENCES teamMember (id_team_member) ON DELETE CASCADE ON UPDATE CASCADE;
