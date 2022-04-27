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
import { useSelector } from "react-redux";
import { selectUser } from "@redux/store";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

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
    passwordConfirm: yup.string().oneOf([yup.ref("password"), null], "Senhas devem ser iguais"),
  })

  .required();

type Inputs = {
  password: string;
  passwordConfirm: string;
};

const ChangePasswordForm = () => {
  const navigate = useNavigate();
  const { changePassword } = authServices();

  const user = useSelector(selectUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { password, passwordConfirm } = data;

    const token = user.user.token;

    try {
      await changePassword({ password }, token);

      toast.success("Sucesso na mudança de senha", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: "customId",
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
          toastId: "customId",
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
          toastId: "customId",
        });
      }
    }
  };

  return (
    <ResetControl>
      <AuthCard titulo="Mudar senha">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input">
            <input {...register("password", { required: true })} type={"password"} placeholder="Nova Senha" />
            {errors.password && <ErrorField>{errors.password.message}</ErrorField>}
            <input
              {...register("passwordConfirm", { required: true })}
              type={"password"}
              placeholder="Confirme a senha"
            />
            {errors.passwordConfirm && <ErrorField>{errors.passwordConfirm.message}</ErrorField>}
          </div>
          <Button>
            Salvar senha
            <FontAwesomeIcon icon={faArrowRight} style={{ color: "#B5C401", marginLeft: 10 }} />
          </Button>
        </form>
      </AuthCard>
      <Link className="back" to="../login">
        <FontAwesomeIcon icon={faArrowLeft} style={{ color: "#707070", marginRight: 10 }} />
        Voltar
      </Link>
    </ResetControl>
  );
};

export default ChangePasswordForm;
