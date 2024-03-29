import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import AuthCard from "@components/UI/Auth/AuthCard";
import Button from "@ui/Auth/Button";
import ErrorField from "@ui/Auth/ErrorField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { authServices } from "@shared/services";

import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addResetPassUser } from "@redux/user.slice";

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
    email: yup.string().required("Você deve preencher o campo email").email("Email inválido"),
  })
  .required();

type Inputs = {
  email: string;
};

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const { reset } = authServices();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email } = data;
    try {
      const resResetPass = await reset({ email });
      toast.success("Sucesso na solicitação", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: 'customId',
      });
      dispatch(addResetPassUser(resResetPass.data));
      navigate("/welcome/change");

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
          toastId: 'customId',
        });
      } else {
        toast.error("Falha na validação de email: " + error.data.errors[0].message, {
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
    <ResetControl>
      <AuthCard titulo="Recuperar a senha">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input">
            <input {...register("email", { required: true })} placeholder="Email" />
            {errors.email && <ErrorField>{errors.email.message}</ErrorField>}
          </div>
          <Button>
            Enviar Link
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

export default ResetPasswordForm;
