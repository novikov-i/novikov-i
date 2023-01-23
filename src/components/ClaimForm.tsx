import React, { useState, useCallback, useEffect } from "react";
import {
  Button,
  FormLayout,
  FormItem,
  Input,
  Div,
  DatePicker,
  CustomSelect,
  Textarea,
} from "@vkontakte/vkui";
import {
  homes as homesConstant,
  mountingTypes as mountingTypesConstant,
  appealTypes as appealTypesConstant,
} from "../constants";

import UserCustomSelect from "./UserCustomSelect";
import { stringify } from "querystring";

interface Props {
  setActivePanel?: (data: string) => void;
}

type UIDate = {
  day: number;
  month: number;
  year: number;
};
interface IForm {
  clientFio: string | null;
  visitingFio: string | null;
  fitterFio: string | null;
  dateOfVisit: UIDate | null;
  dateOfSigning: UIDate | null;
  houseModel: string | null;
  mountingType: string | null;
  address: string | null;
  appealType: string | null;
  comment: string | null;
}

interface FormValidate {
  clientFio: Boolean;
  visitingFio: Boolean;
  fitterFio: Boolean;
  dateOfVisit: Boolean;
  dateOfSigning: Boolean;
  houseModel: Boolean;
  mountingType: Boolean;
  address: Boolean;
  appealType: Boolean;
  comment: Boolean;
}

const formDefault: IForm = {
  clientFio: null,
  visitingFio: null,
  fitterFio: null,
  dateOfVisit: null,
  dateOfSigning: null,
  houseModel: null,
  mountingType: null,
  address: null,
  appealType: null,
  comment: null,
};

const formValidateDefault: FormValidate = {
  clientFio: true,
  visitingFio: true,
  fitterFio: true,
  dateOfVisit: true,
  dateOfSigning: true,
  houseModel: true,
  mountingType: true,
  address: true,
  appealType: true,
  comment: true,
};

function instanceOfDate(object: UIDate | null | string): object is UIDate {
  return object === null || typeof object === "string"
    ? false
    : "year" in object;
}

export const ClaimForm = ({ setActivePanel }: Props) => {
  const [before, setBefore] = useState(undefined);
  const [after, setAfter] = useState(undefined);
  const [disabled, setDisabled] = useState(false);

  const [form, setForm] = useState<IForm>(formDefault);
  const [formValidate, setFormValidate] =
    useState<FormValidate>(formValidateDefault);

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

  const validate = useCallback(() => {
    const obj: any = {};

    Object.keys(form).forEach((key) => {
      const val = form[key as keyof IForm];

      if (!val) {
        obj[key] = false;
      }

      if (instanceOfDate(val)) {
        if (!val?.day || !val?.month) {
          obj[key] = false;
        }
      }
    });

    setFormValidate({ ...formValidate, ...obj });

    console.log("formValidate", formValidate);
  }, [formValidate, form]);

  useEffect(() => {
    // object.values();
    // formValidate
    // @ts-ignore:next-line
    window.Telegram.WebApp.MainButton.show();
    // @ts-ignore:next-line
    window.Telegram.WebApp.MainButton.setParams({
      text: `Отправить форму и прикрепить фото в сообщения к боту`
    })
    //console.log(" window.Telegram.WebApp.MainButton",  window.Telegram.WebApp.MainButton);
  }, []);

  const onSendData = useCallback(() => {
    // window.Telegram.WebApp.sendData()
    validate();
  }, [validate]);

  useEffect(() => {
    // @ts-ignore:next-line
    window.Telegram.WebApp.onEvent('mainButtonClicked', onSendData)
    return () => {
      // @ts-ignore:next-line
      window.Telegram.WebApp.offEvent('mainButtonClicked', onSendData)
    }
}, [onSendData])

  const clientFioChange = useCallback(
    (e: any) => {
      setForm({ ...form, clientFio: e.target.value });
      setFormValidate({ ...formValidate, clientFio: true });
      console.log("change", form, e.target.value);
    },
    [form, formValidate]
  );

  const visitingFioChange = useCallback(
    (e: any) => {
      setForm({ ...form, visitingFio: e.target.value });
      setFormValidate({ ...formValidate, visitingFio: true });
      console.log("change", form, e.target.value);
    },
    [form, formValidate]
  );

  const fitterFioChange = useCallback(
    (e: any) => {
      setForm({ ...form, fitterFio: e.target.value });
      setFormValidate({ ...formValidate, fitterFio: true });
      console.log("change", form, e.target.value);
    },
    [form, formValidate]
  );

  const dateOfVisitChange = useCallback(
    (value: any) => {
      setForm({ ...form, dateOfVisit: value });
      setFormValidate({ ...formValidate, dateOfVisit: true });
      console.log("change", form, value);
    },
    [form, formValidate]
  );

  const dateOfSigningChange = useCallback(
    (value: any) => {
      setForm({ ...form, dateOfSigning: value });
      setFormValidate({ ...formValidate, dateOfSigning: true });
      console.log("change", form, value);
    },
    [form, formValidate]
  );

  const houseModelChange = useCallback(
    (e: any) => {
      setForm({ ...form, houseModel: e.target.value });
      setFormValidate({ ...formValidate, houseModel: true });
      console.log("change", form, e.target.value);
    },
    [form, formValidate]
  );

  const mountingTypeChange = useCallback(
    (e: any) => {
      setForm({ ...form, mountingType: e.target.value });
      setFormValidate({ ...formValidate, mountingType: true });
      console.log("change", form, e.target.value);
    },
    [form, formValidate]
  );

  const addressChange = useCallback(
    (e: any) => {
      setForm({ ...form, address: e.target.value });
      setFormValidate({ ...formValidate, address: true });
      console.log("change", form, e.target.value);
    },
    [form, formValidate]
  );

  const appealTypeChange = useCallback(
    (e: any) => {
      setForm({ ...form, appealType: e.target.value });
      setFormValidate({ ...formValidate, appealType: true });
      console.log("change", form, e.target.value);
    },
    [form, formValidate]
  );

  const commentChange = useCallback(
    (e: any) => {
      setForm({ ...form, comment: e.target.value });
      setFormValidate({ ...formValidate, comment: true });
      console.log("change", form, e.target.value);
    },
    [form, formValidate]
  );

  return (
    <Div>
      <FormLayout>
        <FormItem top="ФИО клиента"
        status={formValidate.clientFio ? undefined : "error"}
        bottom={!formValidate.clientFio && "Обязательное поле"}
        >
          <UserCustomSelect onChange={clientFioChange} />
        </FormItem>

        <FormItem
          top="ФИО выездного"
          status={formValidate.visitingFio ? undefined : "error"}
          bottom={!formValidate.visitingFio && "Обязательное поле"}
        >
          <Input
            before={before}
            after={after}
            type="text"
            defaultValue=""
            disabled={disabled}
            onChange={visitingFioChange}
          />
        </FormItem>

        <FormItem top="ФИО монтажника"
          status={formValidate.fitterFio ? undefined : "error"}
          bottom={!formValidate.fitterFio && "Обязательное поле"}
        >
          <Input
            before={before}
            after={after}
            type="text"
            defaultValue=""
            disabled={disabled}
            onChange={fitterFioChange}
          />
        </FormItem>

        <FormItem top="Дата выезда"
        status={formValidate.dateOfVisit ? undefined : "error"}
        bottom={!formValidate.dateOfVisit && "Обязательное поле"}
        >
          <DatePicker
            min={{ day: 1, month: 1, year: 2000 }}
            max={{ day: 31, month: 12, year: new Date().getFullYear() }}
            onDateChange={dateOfVisitChange}
            dayPlaceholder="ДД"
            monthPlaceholder="ММММ"
            yearPlaceholder="ГГГГ"
          />
        </FormItem>

        <FormItem top="Дата подписания КС"
           status={formValidate.dateOfSigning ? undefined : "error"}
           bottom={!formValidate.dateOfSigning && "Обязательное поле"}
        >
          <DatePicker
            min={{ day: 1, month: 1, year: 2000 }}
            max={{ day: 31, month: 12, year: new Date().getFullYear() }}
            onDateChange={dateOfSigningChange}
            dayPlaceholder="ДД"
            monthPlaceholder="ММММ"
            yearPlaceholder="ГГГГ"
          />
        </FormItem>

        <FormItem top="Модель дома"
           status={formValidate.houseModel ? undefined : "error"}
           bottom={!formValidate.houseModel && "Обязательное поле"}
        >
          <CustomSelect
            placeholder="Введите модель дома"
            searchable
            options={homes}
            onChange={houseModelChange}
          />
        </FormItem>

        <FormItem top="Тип монтажа"
          status={formValidate.mountingType ? undefined : "error"}
          bottom={!formValidate.mountingType && "Обязательное поле"}
        >
          <CustomSelect
            placeholder="Введите тип монтажа"
            options={mountingTypes}
            onChange={mountingTypeChange}
          />
        </FormItem>

        <FormItem top="Адрес объекта"
           status={formValidate.address ? undefined : "error"}
           bottom={!formValidate.address && "Обязательное поле"}
        >
          <Input
            before={before}
            after={after}
            type="text"
            defaultValue=""
            disabled={disabled}
            onChange={addressChange}
          />
        </FormItem>

        <FormItem top="Тип обращения"
          status={formValidate.appealType ? undefined : "error"}
          bottom={!formValidate.appealType && "Обязательное поле"}
        >
          <CustomSelect
            placeholder="Введите тип обращения"
            options={appealTypes}
            onChange={appealTypeChange}
          />
        </FormItem>

        <FormItem top="Комментарий" required
          status={formValidate.comment ? undefined : "error"}
          bottom={!formValidate.comment && "Обязательное поле"}
        >
          <Textarea
            placeholder="Комментарий"
            required
            onChange={commentChange}
          />
        </FormItem>

        {/* <FormItem>
          <Button
            appearance="positive"
            size="l"
            stretched
            onClick={() => {
              console.log("form", form);
              validate();
            }}
          >
            Отправить
          </Button>
        </FormItem> */}
      </FormLayout>
    </Div>
  );
};
