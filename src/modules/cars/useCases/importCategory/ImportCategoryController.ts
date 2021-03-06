import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ImportCategoryUseCase } from './ImportCategoryUseCase';

class ImportCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { file } = req;
    if (!file) return res.status(400).json({ error: 'file required!' });

    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

    await importCategoryUseCase.execute(file);

    return res.status(201).send();
  }
}

export { ImportCategoryController };
