// Componente pode receber um bloco jsx como argumento
// analogia a componentes tenha filhos.

type Props = {
  weight: number;
  children: React.ReactNode;
};

const TestChildren = ({ weight, children }: Props) => {
  return (
    <>
      {children}
      <h3>Testando componente children</h3>
      <h4>Peso = {weight} </h4>
      {children}
    </>
  );
};

export default TestChildren;
