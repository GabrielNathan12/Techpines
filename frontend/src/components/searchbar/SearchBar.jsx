import React, { useState, useCallback } from 'react'
import { TextField, List, ListItem, ListItemText, CircularProgress } from '@mui/material'
import Api from '../../services/api'
import { useNavigate } from 'react-router-dom'
import debounce from 'lodash.debounce'
import './SearchBar.css'

const SearchBar = () => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { fetchAllAlbums, fetchAllTracks } = Api()

    const handleSearch = useCallback(
        debounce(async (value) => {
            if (value.length === 0) {
                setResults([])
                return;
            }
            setLoading(true)
            try {
                const token = localStorage.getItem('token')
                if (!token) {
                    navigate('/');
                    return;
                }

                const [tracksResponse, albumsResponse] = await Promise.all([
                    fetchAllTracks(token),
                    fetchAllAlbums(token)
                ]);

                const tracks = tracksResponse.data.filter(track =>
                    track.name.toLowerCase().includes(value.toLowerCase())
                )
                const albums = albumsResponse.data.filter(album =>
                    album.name.toLowerCase().includes(value.toLowerCase())
                )

                setResults([
                    ...tracks.map(track => ({ ...track, type: 'track' })),
                    ...albums.map(album => ({ ...album, type: 'album' }))
                ])
            } catch (error) {
                console.error('Erro ao buscar dados:', error)
            } finally {
                setLoading(false);
            }
        }, 300),
        []
    );

    const handleChange = (event) => {
        const value = event.target.value
        setQuery(value)
        handleSearch(value)
    };

    const handleSelect = (item) => {
        if (item.type === 'album') {
            navigate(`/album/detail/${item.id}`)
        } else if (item.type === 'track') {
            navigate(`/track/${item.id}`)
        }
    };

    return (
        <div className="search-bar">
            <TextField label="Pesquisar música ou álbum" variant="outlined" fullWidth value={query} onChange={handleChange} placeholder="Digite o nome da música ou álbum" />
            {loading ? (
                <CircularProgress />
            ) : (
                results.length > 0 && (
                    <List>
                        {results.map((item) => (
                            <ListItem key={item.id} onClick={() => handleSelect(item)}>
                                <ListItemText primary={item.name} />
                            </ListItem>
                        ))}
                    </List>
                )
            )}
        </div>
    );
};

export default SearchBar;
