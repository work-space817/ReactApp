import { ChangeEvent, useState } from "react";
import { IRegisterPage, ISelectItem } from "./types";
import InputFileGroup from "../../common/InputFileGroup";

const RegisterPage = () => {
  //створили конкретни екземлеяр на основі нашого інтерфейсу
  const init: IRegisterPage = {
    firstName: "",
    lastName: "",
    email: "",
    phone: 0,
    image: null,
    countyId: 0,
    password: "",
    confirmPassword: "",
  };

  //При зміни значення елемента в useState компонент рендериться повторно і виводить нові значення
  const [data, setData] = useState<IRegisterPage>(init);

  // const [countries, setCountries] = useState<ISelectItem[]>([
  //   {
  //     id: 1,
  //     name: "Україна",
  //   },
  //   {
  //     id: 2,
  //     name: "Польща",
  //   },
  //   {
  //     id: 3,
  //     name: "Амерка USA",
  //   },
  // ]);

  //console.log("Дестурктуризація", {...data, password: "123456"});

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    console.log("Ми відправляємо на сервер", data);
    if (data.password != data.confirmPassword) {
      console.error("Паролі не співпадають");
    }
  };

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onChangeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      console.log("Ви обрали файл", file);
      setData({ ...data, [e.target.name]: file });
    }
    e.target.value = "";
  };

  // const viewCountriesOption = countries.map((c) => (
  //   <option key={c.id} value={c.id}>
  //     {c.name}
  //   </option>
  // ));

  return (
    <>
      <h1 className="text-center">Реєстрація на сайт</h1>
      <form onSubmit={onSubmitHandler} className="col-md-6 offset-md-3">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={data.firstName}
            onChange={onChangeHandler}
            aria-describedby="emailHelp"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={data.lastName}
            onChange={onChangeHandler}
            aria-describedby="emailHelp"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChangeHandler}
            value={data.password}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            onChange={onChangeHandler}
            value={data.confirmPassword}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            aria-describedby="emailHelp"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={data.phone}
            onChange={onChangeHandler}
            aria-describedby="emailHelp"
          />
        </div>

        {/* <div className="mb-3">
          <label htmlFor="countryId" className="form-label">
            Країна
          </label>
          <select
            name="countyId"
            className="form-select"
            id="countryId"
            onChange={onChangeHandler}
          >
            <option selected>Open this select menu</option>
            {viewCountriesOption}
          </select>
        </div> */}

        <InputFileGroup
          field="image"
          onSelectFile={(file) => {
            setData({ ...data, image: file });
          }}
        />

        <button type="submit" className="btn btn-primary">
          Реєстрація
        </button>
      </form>
    </>
  );
};

export default RegisterPage;
