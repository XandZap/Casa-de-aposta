import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import AuthCard from "@components/UI/Auth/AuthCard";
import Button from "@ui/Auth/Button";
import ErrorField from "@ui/Auth/ErrorField";
import { authServices } from "@shared/services";

import { toast } from "react-toastify";

const ResetControl = styled.div`
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
    height: 20vh;
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

const schema = yup
  .object({
    password: yup
      .string()
      .required("Você deve preencher o campo senha")
      .min(4, "Senha deve ter no mínimo 4 caracters"),
  })
  .required();

type Inputs = {
  password: string;
};

const ChangePasswordForm = () => {
  const navigate = useNavigate();
  const { changePassword } = authServices();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { password } = data;
    const token = localStorage.getItem("token");

    try {
      const resChangePass = await changePassword({ password }, token);

      toast.success("Sucesso na mudança de senha", {
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
      if (error.status === 404) {
        toast.error(error.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Falha na mudança de senha" + error, {
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
    <ResetControl>
      <AuthCard titulo="Mudar senha">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input">
            <input {...register("password", { required: true })} placeholder="Nova Senha" />
            {errors.password && <ErrorField>{errors.password.message}</ErrorField>}
          </div>
          <Button>Enviar Link</Button>
        </form>
      </AuthCard>
      <Link className="back" to="../login">
        Voltar
      </Link>
    </ResetControl>
  );
};

export default ChangePasswordForm;
