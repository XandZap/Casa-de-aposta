import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import AuthCard from "@components/UI/Auth/AuthCard";
import Button from "@ui/Auth/Button";
import ErrorField from "@ui/Auth/ErrorField";
import userServices from "@shared/services/user";

import { toast } from "react-toastify";

const RegisterControl = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto 0;

  form {
    display: flex;
    flex-direction: column;
  }

  .input {
    display: flex;
    flex-direction: column;
    height: 50vh;
  }

  form input {
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    font: italic normal bold 17px/70px Helvetica;
    color: #9d9d9d;
    padding-left: 20px;
    outline: 0;
    height: 15vh;
    border: none;
    border-bottom: 3px solid #ebebeb;
  }

  .back {
    text-align: center;
    font: italic normal bold 35px/70px Helvetica;
    color: #707070;
  }
`;

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const schema = yup
  .object({
    name: yup.string().required("Você deve preencher o campo nome"),
    email: yup.string().required("Você deve preencher o campo email").email("Email inválido"),
    password: yup
      .string()
      .required("Você deve preencher o campo senha")
      .min(4, "Senha deve ter no mínimo 4 caracters"),
  })
  .required();

const RegisterForm = () => {
  const { registerUser } = userServices();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password, name } = data;
    try {
      const resRegister = await registerUser({ email, password, name });
      console.log("resLogin: ", resRegister);
      toast.success("Usuário criado com sucesso", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/welcome/login");
    } catch (error: any) {
      if (error.status === 401) {
        toast.success("Falha ao criar usuário: " + error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  return (
    <RegisterControl>
      <AuthCard titulo="Registrar">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input">
            <input {...register("name", { required: true })} placeholder="Nome" />
            {errors.name && <ErrorField>{errors.name.message}</ErrorField>}
            <input {...register("email", { required: true })} placeholder="Email" />
            {errors.email && <ErrorField>{errors.email.message}</ErrorField>}
            <input {...register("password", { required: true })} type="password" placeholder="Senha" />
            {errors.password && <ErrorField>{errors.password.message}</ErrorField>}
            <Button>Registrar</Button>
          </div>
        </form>
      </AuthCard>
      <Link className="back" to="../login">
        Voltar
      </Link>
    </RegisterControl>
  );
};

export default RegisterForm;
