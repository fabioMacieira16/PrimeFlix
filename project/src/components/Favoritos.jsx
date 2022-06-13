import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './favoritos.css';
import { toast } from "react-toastify";

export default function Favoritos() {
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const minhaLista = localStorage.getItem("@primeFlix");
        setFilmes(JSON.parse(minhaLista) || []);
    }, [])

    const excluir = (id) => {
        let filtro = filmes.filter((item) => {
            return (item.id !== id);
        })
        setFilmes(filtro)
        localStorage.setItem("@primeFlix", JSON.stringify(filtro))
        toast.success("filme removido com sucesso");
    }

    return (
        <div className='meus-filmes'>
            <h1>Meus filmes</h1>

            {filmes.length === 0 && <span>você nao possui filmes salvos</span>}

            <ul>
                {filmes?.map((item) => {
                    return (
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                                <button onClick={() => excluir(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
