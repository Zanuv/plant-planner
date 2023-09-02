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

-- Create the sequences

CREATE SEQUENCE public.lists_list_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE SEQUENCE public.plants_plant_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE SEQUENCE public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- Set ownership for sequences

ALTER SEQUENCE public.lists_list_id_seq OWNER TO postgres;
ALTER SEQUENCE public.plants_plant_id_seq OWNER TO postgres;
ALTER SEQUENCE public.users_user_id_seq OWNER TO postgres;

-- Set default values for IDs

ALTER TABLE ONLY public.lists ALTER COLUMN list_id SET DEFAULT nextval('public.lists_list_id_seq'::regclass);
ALTER TABLE ONLY public.plants ALTER COLUMN plant_id SET DEFAULT nextval('public.plants_plant_id_seq'::regclass);
ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);

-- Add foreign key constraints

ALTER TABLE ONLY public.list_plants
    ADD CONSTRAINT list_plants_pkey PRIMARY KEY (list_id, plant_id),
    ADD CONSTRAINT list_plants_list_id_fkey FOREIGN KEY (list_id) REFERENCES public.lists(list_id),
    ADD CONSTRAINT list_plants_plant_id_fkey FOREIGN KEY (plant_id) REFERENCES public.plants(plant_id);

ALTER TABLE ONLY public.lists
    ADD CONSTRAINT lists_pkey PRIMARY KEY (list_id),
    ADD CONSTRAINT lists_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);

-- Optional: Add unique constraints

-- ALTER TABLE ONLY public.users ADD CONSTRAINT users_email_key UNIQUE (email);
-- ALTER TABLE ONLY public.users ADD CONSTRAINT users_username_key UNIQUE (username);

