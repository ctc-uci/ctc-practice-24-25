DROP SEQUENCE IF EXISTS project_id_seq;

CREATE SEQUENCE project_id_seq
INCREMENT 1
START 1;

DROP TABLE IF EXISTS sk_project_info CASCADE;

CREATE TABLE IF NOT EXISTS sk_project_info
(
  id integer NOT NULL DEFAULT nextval('project_id_seq'::regclass) PRIMARY KEY,
  npo_id integer NOT NULL REFERENCES npo_info (id) ON DELETE CASCADE,
  start_year integer NOT NULL,
  end_year integer NOT NULL,
  project_leads text[3]
);
