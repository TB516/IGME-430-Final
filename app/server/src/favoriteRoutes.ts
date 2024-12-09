import { Router } from 'express';
import { addFavorite, getFavorites, removeFavorite } from './controllers/FavoritesController';

const favorites = Router();

favorites.get('/', (req, res) => { getFavorites(req, res); });
favorites.post('/add', (req, res) => { addFavorite(req, res); });
favorites.post('/remove', (req, res) => { removeFavorite(req, res); });

export default favorites;
