DROP TABLE IF EXISTS sz_project_info;

CREATE TABLE sz_project_info (
    id serial PRIMARY KEY,
    npo_id integer NOT NULL,
    start_year integer NOT NULL,
    end_year integer NOT NULL,
    project_leads VARCHAR(256)[] NOT NULL,
    FOREIGN KEY (npo_id) REFERENCES npo_info(id)
);
