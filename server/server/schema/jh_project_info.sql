DROP TABLE IF EXISTS jh_project_info CASCADE;

CREATE TABLE jh_project_info (
  id SERIAL PRIMARY KEY,
  npo_id INTEGER NOT NULL,
	start_year INTEGER NOT NULL,
	end_year INTEGER NOT NULL,
	project_leads VARCHAR(128)[] NOT NULL,
	FOREIGN KEY (npo_id) REFERENCES npo_info(id)
);

