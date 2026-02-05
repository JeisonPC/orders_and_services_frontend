import { Customer } from '../types/Customer.type';

export const getCustomersUseCase = async (
  getCustomers: () => Promise<Customer[]>
): Promise<Customer[]> => {
  const customers = await getCustomers();
  
  // Aquí podrías agregar lógica de negocio adicional
  // Por ejemplo: filtrar, ordenar, transformar datos, etc.
  
  return customers;
};
