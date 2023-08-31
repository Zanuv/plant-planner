--
-- PostgreSQL database dump
--

-- Dumped from database version 14.6 (Ubuntu 14.6-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.6 (Ubuntu 14.6-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: list_plants; Type: TABLE; Schema: public; Owner: zane
--

CREATE TABLE public.list_plants (
    list_id integer NOT NULL,
    plant_id integer NOT NULL
);


ALTER TABLE public.list_plants OWNER TO zane;

--
-- Name: lists; Type: TABLE; Schema: public; Owner: zane
--

CREATE TABLE public.lists (
    list_id integer NOT NULL,
    user_id integer,
    list_name character varying(255) NOT NULL
);


ALTER TABLE public.lists OWNER TO zane;

--
-- Name: lists_list_id_seq; Type: SEQUENCE; Schema: public; Owner: zane
--

CREATE SEQUENCE public.lists_list_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lists_list_id_seq OWNER TO zane;

--
-- Name: lists_list_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zane
--

ALTER SEQUENCE public.lists_list_id_seq OWNED BY public.lists.list_id;


--
-- Name: plants; Type: TABLE; Schema: public; Owner: zane
--

CREATE TABLE public.plants (
    plant_id integer NOT NULL,
    plant_external_id integer,
    custom_notes text,
    plant_name text,
    image_url text,
    scientific_name text
);


ALTER TABLE public.plants OWNER TO zane;

--
-- Name: plants_plant_id_seq; Type: SEQUENCE; Schema: public; Owner: zane
--

CREATE SEQUENCE public.plants_plant_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.plants_plant_id_seq OWNER TO zane;

--
-- Name: plants_plant_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zane
--

ALTER SEQUENCE public.plants_plant_id_seq OWNED BY public.plants.plant_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: zane
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(255) NOT NULL,
    hashed_password character varying(255) NOT NULL,
    email character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO zane;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: zane
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO zane;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zane
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: lists list_id; Type: DEFAULT; Schema: public; Owner: zane
--

ALTER TABLE ONLY public.lists ALTER COLUMN list_id SET DEFAULT nextval('public.lists_list_id_seq'::regclass);


--
-- Name: plants plant_id; Type: DEFAULT; Schema: public; Owner: zane
--

ALTER TABLE ONLY public.plants ALTER COLUMN plant_id SET DEFAULT nextval('public.plants_plant_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: zane
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Name: list_plants list_plants_pkey; Type: CONSTRAINT; Schema: public; Owner: zane
--

ALTER TABLE ONLY public.list_plants
    ADD CONSTRAINT list_plants_pkey PRIMARY KEY (list_id, plant_id);


--
-- Name: lists lists_pkey; Type: CONSTRAINT; Schema: public; Owner: zane
--

ALTER TABLE ONLY public.lists
    ADD CONSTRAINT lists_pkey PRIMARY KEY (list_id);


--
-- Name: plants plants_pkey; Type: CONSTRAINT; Schema: public; Owner: zane
--

ALTER TABLE ONLY public.plants
    ADD CONSTRAINT plants_pkey PRIMARY KEY (plant_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: zane
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: zane
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: zane
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: list_plants list_plants_list_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zane
--

ALTER TABLE ONLY public.list_plants
    ADD CONSTRAINT list_plants_list_id_fkey FOREIGN KEY (list_id) REFERENCES public.lists(list_id);


--
-- Name: list_plants list_plants_plant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zane
--

ALTER TABLE ONLY public.list_plants
    ADD CONSTRAINT list_plants_plant_id_fkey FOREIGN KEY (plant_id) REFERENCES public.plants(plant_id);


--
-- Name: lists lists_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zane
--

ALTER TABLE ONLY public.lists
    ADD CONSTRAINT lists_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

