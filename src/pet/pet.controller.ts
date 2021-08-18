import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import axios from 'axios';

@Controller('pet')
export class PetController {
    @Get('axios')
    public async getTask(@Res() response: Response) {
        const requestPets = await axios.get('https://bsl1.herokuapp.com/pet');
        const pets = requestPets.data;
        const requestCategories = await axios.get('https://bsl1.herokuapp.com/pet/categories');
        const categorias = requestCategories.data.categories;
        const petsWithCatName = pets.map((pet) => {
            delete pet.id;
            pet.category = categorias.find((category) => category.id === pet.category,).name;
            return pet;
        });

    return response.status(HttpStatus.OK).send({ petsWithCatName });
  }
}


