import { Request, Response } from 'express';
import Account from '../models/Account';

const addFavorite = async (request: Request, response: Response) => {
  const account = await Account.findOne({ username: request.session.account!.username }).exec();

  if (!account) {
    return response.status(401).json({ error: 'Account could not be found!' });
  }

  if (request.body.type === 'Sorceries') {
    account.favoriteSorceries.push(request.body.favorite);
  } else if (request.body.type === 'Incantations') {
    account.favoriteIncantations.push(request.body.favorite);
  } else {
    return response.status(400).json({ errors: 'Invalid favorite type!' });
  }

  const errors = account.validateSync();

  if (errors) {
    return response.status(400).json({ errors: 'Invalid favorite name!' });
  }

  return response.status(200).json({ message: 'Added favorite' });
};

const removeFavorite = async (request: Request, response: Response) => {
  const account = await Account.findOne({ username: request.session.account!.username }).exec();

  if (!account) {
    return response.status(401).json({ error: 'Account could not be found!' });
  }
  if (!request.body.favorite || typeof (request.body.favorite) !== typeof (String)) {
    return response.status(400).json({ error: 'Favorite could not be found!' });
  }

  if (request.body.type === 'Sorceries') {
    account.favoriteSorceries = account.favoriteSorceries.filter((favorite) => { return favorite !== request.body.favorite; });
  } else if (request.body.type === 'Incantations') {
    account.favoriteIncantations = account.favoriteIncantations.filter((favorite) => { return favorite !== request.body.favorite; });
  } else {
    return response.status(400).json({ errors: 'Invalid favorite type!' });
  }

  return response.status(200).json({ message: 'Removed favorite' });
};

const getFavorites = async (request: Request, response: Response) => {
  const account = await Account.findOne({ username: request.session.account!.username }).exec();

  if (!account) {
    return response.status(401).json({ error: 'Account could not be found!' });
  }

  let query: string;

  if (request.body.type === 'Sorceries') {
    query = account.favoriteSorceries.map((favorite) => { return `name=${favorite}`; }).join('&');
  } else if (request.body.type === 'Incantations') {
    query = account.favoriteIncantations.map((favorite) => { return `name=${favorite}`; }).join('&');
  } else {
    return response.status(400).json({ errors: 'Invalid favorite type!' });
  }

  const favoriteDocuments = await (await fetch(`${process.env.API_URL!}/${request.body.type}/${query}`)).json();

  return response.status(200).json(favoriteDocuments);
};

export { addFavorite, removeFavorite, getFavorites };
