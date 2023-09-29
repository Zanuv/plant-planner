-- Create the tables

CREATE TABLE public.list_plants (
    list_id integer NOT NULL,
    plant_id integer NOT NULL
);

CREATE TABLE public.lists (
    list_id serial PRIMARY KEY,
    user_id integer,
    list_name character varying(255) NOT NULL,
    description text
);

CREATE TABLE public.plants (
    plant_id serial PRIMARY KEY,
    plant_external_id integer,
    custom_notes text,
    plant_name text,
    image_url text,
    scientific_name text
);

CREATE TABLE public.users (
    user_id serial PRIMARY KEY,
    username character varying(255) NOT NULL,
    hashed_password character varying(255) NOT NULL,
    email character varying(255) NOT NULL
);

-- Set ownership for tables

ALTER TABLE public.lists OWNER TO zane;
ALTER TABLE public.plants OWNER TO zane;
ALTER TABLE public.users OWNER TO zane;
ALTER TABLE public.list_plants OWNER TO zane;

-- Add foreign key constraints

ALTER TABLE ONLY public.list_plants
    ADD CONSTRAINT list_plants_pkey PRIMARY KEY (list_id, plant_id),
    ADD CONSTRAINT list_plants_list_id_fkey FOREIGN KEY (list_id) REFERENCES public.lists(list_id),
    ADD CONSTRAINT list_plants_plant_id_fkey FOREIGN KEY (plant_id) REFERENCES public.plants(plant_id);

ALTER TABLE ONLY public.users ADD CONSTRAINT users_email_key UNIQUE (email);
ALTER TABLE ONLY public.users ADD CONSTRAINT users_username_key UNIQUE (username);
