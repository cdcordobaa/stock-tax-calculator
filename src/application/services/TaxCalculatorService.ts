import { mapDTOToOperation } from "../../domain/models/Operation";
import { calculateTaxes, mapTaxToDTO } from "../../domain/models/Tax";
import { OperationDTO } from "../dtos/OperationDTO";
import { TaxResponseDTO } from "../dtos/TaxResponseDTO";

export const calculateTaxesService = (
  operationDTOs: OperationDTO[]
): TaxResponseDTO[] => {
  const operations = operationDTOs.map(mapDTOToOperation);

  const taxes = calculateTaxes(operations);

  return taxes.map(mapTaxToDTO);
};
