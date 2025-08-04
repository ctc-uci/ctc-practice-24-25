DROP TABLE IF EXISTS nn_project_info CASCADE;

CREATE TABLE nn_project_info (
  id INTEGER PRIMARY KEY,
  npo_id INTEGER REFERENCES npo_info(id),
  start_year INTEGER,
  end_year INTEGER,
  project_leads TEXT[]
);

