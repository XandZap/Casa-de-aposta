import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { authServices } from "@shared/services";

import AuthCard from "@components/UI/Auth/AuthCard";
import Button from "@components/UI/Auth/Button";
import ErrorField from "@ui/Auth/ErrorField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUser } from "@redux/user.slice";

const LoginControl = styled.div`
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
    height: 25vh;
  }

  form input {
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    font: italic normal bold 17px/70px Helvetica;
    color: #9d9d9d;
    padding-left: 20px;
    outline: 0;
    height: 50vh;
    box-shadow: 0 0 0 0;
    border: none;

    border-bottom: 3px solid #ebebeb;
  }

  .forget {
    padding: 20px 20px 0;
    align-self: flex-end;
    font: italic normal normal 17px/70px Helvetica;
    color: #c1c1c1;
  }

  .registrar {
    text-align: center;
    font: italic normal bold 35px/70px Helvetica;
    color: #707070;
  }
`;

type Inputs = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup.string().required("Você deve preencher o campo email").email("Email inválido"),
    password: yup
      .string()
      .required("Você deve preencher o campo senha")
      .min(4, "Senha deve ter no mínimo 4 caracters"),
  })
  .required();

const LoginForm = () => {
  const { login } = authServices();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data;
    try {
      const resLogin = await login({ email, password });
      toast.success("Login efetuado com sucesso", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: 'customId',
      });
      dispatch(addUser(resLogin.data));

      navigate("/");
    } catch (error: any) {
      if (error.status === 401) {
        toast.error("Falha na autenticação", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          toastId: 'customId',
        });
      }
    }
  };

  return (
    <LoginControl>
      <AuthCard titulo="Autenticação">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input">
            <input {...register("email", { required: true })} placeholder="Email" />
            {errors.email && <ErrorField>{errors.email.message}</ErrorField>}
            <input {...register("password", { required: true })} type="password" placeholder="Senha" />
            {errors.password && <ErrorField>{errors.password.message}</ErrorField>}
          </div>
          <Link to="../resetpassword" className="forget">
            Esqueceu a senha?
          </Link>
          <Button type="submit">
            Entrar <FontAwesomeIcon icon={faArrowRight} style={{ color: "#B5C401", marginLeft: 10 }} />
          </Button>
        </form>
      </AuthCard>
      <Link className="registrar" to="../register">
        Registrar
        <FontAwesomeIcon icon={faArrowRight} style={{ color: "#707070", marginLeft: 10 }} />
      </Link>
    </LoginControl>
  );
};

export default LoginForm;
