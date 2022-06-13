import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api';
import './filme.css'

export default function Filmes() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilmes] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilmes() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "d3563affef2098e31a568cc200b7972d",
                    language: "pt-BR",
                }
            }).then((response) => {
                setFilmes(response.data);
                setLoading(false);
            }).catch(() => {
                navigate("/", { replace: true })
            })
        }
        loadFilmes();

    }, [navigate, id])

    const save = () => {
        const minhaLista = localStorage.getItem("@primeFlix");
        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((fS) => fS.id == filme.id)

        if (hasFilme) {
            alert("Esse filme já se encontra na lista");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeFlix", JSON.stringify(filmesSalvos));
        alert("Filme salva com sucesso");
    }

    if (loading) {
        return (
            <div className='filme-info'>
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return (
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className='area-buttons'>
                <button onClick={save}>Salvar</button>
                <button>
                    <a target="_blank" rel='external' href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}