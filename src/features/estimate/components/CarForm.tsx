import { SelectCarYear } from "./SelectType";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { FuelsType, Gas, type CarListResponse, type CarModels, type RequestUnit } from "../type/types";
import { getCars } from "../services/car-estimate.service";
import { SelectCarBrand } from "./SelectBrandCar";
import { SelectCarModel } from "./SelectBrancModel";
import { fuelTypes } from "@/mocks/car-data.mock";
import { SelectFuelType } from "./SelectFuelType";

interface CarFormProps {
  onChange: (prop: string, value: string | number | boolean) => void;
  data: RequestUnit;
}

export function CarForm({ onChange, data }: CarFormProps) {
  const [carsList, setCarsList] = useState<CarListResponse[]>([]);
  const [models, setModels] = useState<CarModels[]>([]);
  const [isNewCar, setNewCar] = useState(false);
  const [isPersonalUse, setPersonalUse] = useState(false);
  const [typeInstallation, setTypeInstallation] = useState<string>("");
  const [typeGas, setTypeGas] = useState<string>("");

  const actualYear = new Date().getFullYear();
  const years = Array.from({ length: 16 }, (_, i) => actualYear - i);
  const cars = carsList.map((car) => car.marca);

  const handleGetModels = (brand: string) => {
    const models = carsList.find((car) => car.marca === brand)?.modelos;
    if (!models) return [];
    setModels(models);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = e.target.value.replace(/[^\d]/g, "");
    onChange("worth", numValue ? Number(numValue) : 0);
  };

  const handleIsNewCarValue = (isNew: boolean) => {
    setNewCar(isNew);
    onChange("isNew", isNew);
  };

  const handleIsPersonalUseValue = (isPersonalUse: boolean) => {
    setPersonalUse(isPersonalUse);
    onChange("isPersonalUse", isPersonalUse);
  };

  const handleInstallationValue = (typeInstallation: string) => {
    setTypeInstallation(typeInstallation);
    onChange("installationType", typeInstallation);
  };

  const handleGasValue = (typeGas: string) => {
    setTypeGas(typeGas);
    onChange("gasType", typeGas);
  };

  useEffect(() => {
    getCars().then((cars) => setCarsList(cars));
  }, []);

  return (
    <FieldGroup>
      <FieldSet>
        <FieldDescription className="text-center text-blue-600 font-semibold">
          Datos del Vehículo
        </FieldDescription>
        <FieldGroup>
          <Field>
            <SelectCarBrand items={cars} fn={(e) => handleGetModels(e)} />
          </Field>
          <Field>
            <SelectCarModel
              items={models}
              fn={(e) => onChange("modelId", Number(e))}
            />
          </Field>
          <Field>
            <SelectCarYear
              items={years}
              fn={(e) => onChange("year", Number(e))}
            />
          </Field>
          <Field>
            <p className="text-center">¿Es un vehículo cero km?</p>
            <div className="grid grid-cols-2 gap-3 w-full">
              <Button
                type="button"
                variant={"outline"}
                onClick={() => handleIsNewCarValue(true)}
                className={` ${
                  isNewCar
                    ? "bg-[#072b73] text-white"
                    : "bg-gray-300 text-gray-700"
                } py-2.5 px-5 border-none rounded-md cursor-pointer`}
              >
                Sí
              </Button>
              <Button
                type="button"
                variant={"outline"}
                onClick={() => handleIsNewCarValue(false)}
                className={`${
                  !isNewCar
                    ? "bg-[#072b73] text-white"
                    : "bg-gray-300 text-gray-700"
                } py-2.5 px-5 border-none rounded-md cursor-pointer`}
              >
                No
              </Button>
            </div>
          </Field>
          <Field>
            <SelectFuelType
              items={fuelTypes}
              fn={(e) => onChange("fuelType", Number(e))}
            />

          {
            data.car.fuelType === FuelsType.GAS ? (
                <div className="grid grid-cols-2 gap-3 w-full">
              <div className="flex flex-col items-center justify-center gap-4">
                <p>Tipo de gas</p>
                <div className="grid grid-cols-2 gap-3 w-full">
                  <Button
                    type="button"
                    className={` ${
                      typeGas === Gas.GLP
                        ? "bg-[#072b73] text-white"
                        : "bg-gray-300 text-gray-700"
                    } py-2.5 px-5 border-none rounded-md cursor-pointer`}
                    onClick={() => handleGasValue("GLP")}
                  >
                    GLP
                  </Button>
                  <Button
                    type="button"
                    className={` ${
                      typeGas === Gas.GNV
                        ? "bg-[#072b73] text-white"
                        : "bg-gray-300 text-gray-700"
                    } py-2.5 px-5 border-none rounded-md cursor-pointer`}
                    onClick={() => handleGasValue("GNV")}
                  >
                    GNV
                  </Button>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-4">
                <p>Tipo de instalación</p>
                <div className="grid grid-cols-2 gap-3 w-full">
                  <Button
                    type="button"
                    className={` ${
                      typeInstallation === "Adaptado"
                        ? "bg-[#072b73] text-white"
                        : "bg-gray-300 text-gray-700"
                    } py-2.5 px-5 border-none rounded-md cursor-pointer`}
                    onClick={() => handleInstallationValue("Adaptado")}
                  >
                    Adaptado
                  </Button>
                  <Button
                    type="button"
                    className={` ${
                      typeInstallation === "De fábrica"
                        ? "bg-[#072b73] text-white"
                        : "bg-gray-300 text-gray-700"
                    } py-2.5 px-5 border-none rounded-md cursor-pointer`}
                    onClick={() => handleInstallationValue("De fábrica")}
                  >
                    De fábrica
                  </Button>
                </div>
              </div>
            </div>
            ) : ''
          }
            <p className="text-center">¿Es un vehículo personal?</p>
            <div className="grid grid-cols-2 gap-3 w-full">
              <Button
                type="button"
                variant={"outline"}
                onClick={() => handleIsPersonalUseValue(true)}
                className={`${
                  isPersonalUse
                    ? "bg-[#072b73] text-white"
                    : "bg-gray-300 text-gray-700"
                } py-2.5 px-5 border-none rounded-md cursor-pointer`}
              >
                Sí
              </Button>
              <Button
                type="button"
                variant={"outline"}
                onClick={() => handleIsPersonalUseValue(false)}
                className={`${
                  !isPersonalUse
                    ? "bg-[#072b73] text-white"
                    : "bg-gray-300 text-gray-700"
                } py-2.5 px-5 border-none rounded-md cursor-pointer`}
              >
                No
              </Button>
            </div>
          </Field>

          <Field>
            <div className="flex flex-col items-center justify-center gap-4">
              <FieldLabel>¿Cuánto cuesta tu vehículo?</FieldLabel>
              <div className="relative w-full">
                {data.car.worth > 0 && (
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500 font-semibold">
                    RD$
                  </span>
                )}
                <Input
                  type="text"
                  placeholder="Ingresa el valor"
                  value={data.car.worth || ""}
                  onChange={handleValueChange}
                  className={`text-center ${
                    data.car.worth > 0 ? "text-orange-500 font-semibold" : ""
                  }`}
                />
              </div>
              <p className="text-sm text-gray-600 text-center">
                Aseguramos vehículos desde <br />
                RD$200,000 hasta RD$7,000,000
              </p>
            </div>
          </Field>
        </FieldGroup>
      </FieldSet>
    </FieldGroup>
  );
}
