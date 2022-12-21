import React, { useState } from "react";
import {
  Header,
  Group,
  SimpleCell,
  Button,
  ButtonGroup,
  FormLayout,
  FormItem,
  Input,
  Div,
  DatePicker,
  CustomSelect,
  Textarea,
  File,
  Image,
} from "@vkontakte/vkui";
import {
  Icon16DoneCircle,
  Icon16WorkOutline,
  Icon24Camera,
} from "@vkontakte/icons";
import { Interface } from "readline";
import {
  homes as homesConstant,
  mountingTypes as mountingTypesConstant,
  appealTypes as appealTypesConstant,
} from "./constants";

// import Image from "@vkontakte/vkui/dist/components/Image/";

interface Props {
  setActivePanel?: (data: string) => void;
}

function testFunc(file: any) {
  console.log(file);
}

export const ClaimForm = ({ setActivePanel }: Props) => {
  const [before, setBefore] = useState(undefined);
  const [after, setAfter] = useState(undefined);
  const [align, setAlign] = useState("left");
  const [disabled, setDisabled] = useState(false);

  const [images, setImages] = useState<FileList | null>(null);

  const [homes] = useState([
    ...homesConstant.map((home: string) => {
      return { label: home, value: home };
    }),
  ]);

  const [mountingTypes] = useState([
    ...mountingTypesConstant.map((home: string) => {
      return { label: home, value: home };
    }),
  ]);

  const [appealTypes] = useState([
    ...appealTypesConstant.map((home: string) => {
      return { label: home, value: home };
    }),
  ]);

  return (
    <Div>
      <FormLayout>
        <FormItem top="ФИО клиента">
          <Input
            before={before}
            after={after}
            type="text"
            defaultValue=""
            disabled={disabled}
          />
        </FormItem>

        <FormItem top="ФИО выездного">
          <Input
            before={before}
            after={after}
            type="text"
            defaultValue=""
            disabled={disabled}
          />
        </FormItem>

        <FormItem top="ФИО монтажника">
          <Input
            before={before}
            after={after}
            type="text"
            defaultValue=""
            disabled={disabled}
          />
        </FormItem>

        <FormItem top="Дата выезда">
          <DatePicker
            min={{ day: 1, month: 1, year: 2000 }}
            max={{ day: 1, month: 1, year: new Date().getFullYear() }}
            onDateChange={(value) => {
              console.log(value);
            }}
            dayPlaceholder="ДД"
            monthPlaceholder="ММММ"
            yearPlaceholder="ГГГГ"
          />
        </FormItem>

        <FormItem top="Дата подписания КС">
          <DatePicker
            min={{ day: 1, month: 1, year: 2000 }}
            max={{ day: 1, month: 1, year: new Date().getFullYear() }}
            onDateChange={(value) => {
              console.log(value);
            }}
            dayPlaceholder="ДД"
            monthPlaceholder="ММММ"
            yearPlaceholder="ГГГГ"
          />
        </FormItem>

        <FormItem top="Модель дома">
          <CustomSelect
            placeholder="Введите модель дома"
            searchable
            options={homes}
          />
        </FormItem>

        <FormItem top="Тип монтажа">
          <CustomSelect
            placeholder="Введите тип монтажа"
            options={mountingTypes}
          />
        </FormItem>

        {/* Адрес объекта */}

        <FormItem top="Тип обращения">
          <CustomSelect
            placeholder="Введите тип обращения"
            options={appealTypes}
          />
        </FormItem>

        <FormItem top="Комментарий" required>
          <Textarea placeholder="Комментарий" required />
        </FormItem>

        <FormItem top="Фото" bottom="максимум 10 фото" required>
          <ButtonGroup mode="horizontal" gap="m" stretched>
            <File
              before={<Icon24Camera role="presentation" />}
              size="m"
              itemType="image"
              accept=".jpg, .jpeg, .png"
              multiple
              onChange={(file) => {
                setImages(file.currentTarget.files);
                testFunc(file.currentTarget.files);
              }}
            >
              Открыть галерею
            </File>
            {images && <Button size="m" onClick={() => setImages(null)} >Очистить</Button>}
          </ButtonGroup>
          {images && (
            <div
              style={{
                display: "flex",
                paddingTop: 12,
                gap: 8,
                flexFlow: "row wrap",
              }}
            >
              {Object.values(images).map((file) => {
                return <Image key={file.name} size={72} src={URL.createObjectURL(file)} />;
              })}
            </div>
          )}
        </FormItem>

        {/* <CustomSelect
          placeholder="Введите имя пользователя"
          searchable
          options={users}
        /> */}

        <FormItem>
          <Button appearance="positive" size="l" stretched>
            Отправить
          </Button>
        </FormItem>
      </FormLayout>
    </Div>
  );
};
