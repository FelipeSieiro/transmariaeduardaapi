import {
  IsArray,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

export class ItemAgendamentoRotaDto {
  @IsUUID("4", { message: "O ID da rota deve ser um UUID válido." })
  rota_id!: string;

  @IsInt({ message: "O dia da semana deve ser um número inteiro." })
  @Min(0, { message: "O dia da semana deve ser entre 0 (Domingo) e 6 (Sábado)." })
  @Max(6, { message: "O dia da semana deve ser entre 0 (Domingo) e 6 (Sábado)." })
  dia_semana!: number; // 0=Dom, 1=Seg, 2=Ter, 3=Qua, 4=Qui, 5=Sex, 6=Sáb

  @IsIn(["ENTRADA", "SAIDA"], {
    message: "O tipo de trajeto deve ser ENTRADA ou SAIDA.",
  })
  tipo_trajeto!: "ENTRADA" | "SAIDA";

  @IsString({ message: "Informe um horário válido no formato HH:mm." })
  horario!: string;

  @IsOptional()
  @IsString()
  observacao?: string;
}

export class SyncAgendamentosAlunoDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemAgendamentoRotaDto)
  agendamentos!: ItemAgendamentoRotaDto[];
}