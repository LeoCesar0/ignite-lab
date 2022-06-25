import { gql, useMutation, useQuery } from "@apollo/client";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

const CREATE_SUBSCRIBER = gql`
  mutation createSubscriber($name: String!, $email: String!) {
    createSubscriber(data: { name: $name, email: $email }) {
      id
    }
  }
`;

const Subscribe = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
  });
  const [createSubscriber, { loading, error }] = useMutation(CREATE_SUBSCRIBER);
  const navigate = useNavigate()

  // const {data} = useQuery(CREATE_SUBSCRIBER,{
  //   variables: {
  //     name: formValues.name,
  //     email: formValues.email
  //   }
  // })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await createSubscriber({
      variables: formValues,
    });

    if(error){
      console.log(error)
    }else{
      navigate('/event')
    }
  };

  return (
    <>
      <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
        <div className="max-w-[1100px] w-full flex items-center justify-between  mt-20 mx-auto ">
          <div className="max-w-[640px] flex flex-col">
            <Logo />
            <h1 className="text-[40px] leading-tight text-white mt-8">
              Construa uma{" "}
              <strong className="text-blue-500">aplicação completa</strong>,{" "}
              <br /> do zero, com{" "}
              <strong className="text-blue-500">React JS</strong>
            </h1>
            <p className="text-sm text-gray-200 mt-6 leading-relaxed">
              Em apenas uma semana você vai dominar na prática uma das
              tecnologias mais utilizadas e com alta demanda para acessar as
              melhores oportunidades do mercado.
            </p>
          </div>
          <div className="bg-gray-700 border border-gray-500 rounded p-8">
            <strong className="text-2xl mb-6 block">
              Inscreva-se gratuitamente
            </strong>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-2 w-full"
            >
              <input
                type="text"
                placeholder="Nome completo"
                className="bg-gray-900 rounded px-5 h-14"
                value={formValues.name}
                onChange={(e) => {
                  setFormValues({ ...formValues, name: e.target.value });
                }}
              />
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="bg-gray-900 rounded px-5 h-14"
                value={formValues.email}
                onChange={(e) => {
                  setFormValues({ ...formValues, email: e.target.value });
                }}
              />
              <button
                disabled={loading}
                type="submit"
                className="uppercase mt-4 bg-green-500 py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors"
              >
                Inscrever
              </button>
            </form>
          </div>
        </div>
        <img
          src="/src/assets/subscribe/image.png"
          className="mt-18"
          alt="code-mockup"
        />
      </div>
    </>
  );
};

export default Subscribe;
//
