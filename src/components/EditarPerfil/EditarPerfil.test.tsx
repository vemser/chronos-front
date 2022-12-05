import { EditarPerfil } from "./EditarPerfil";
import { render, screen } from "@testing-library/react";
import { AdminProvider } from "../../context/AdminContext";
import { BrowserRouter} from 'react-router-dom'


  test('deve achar o botão na tela', () => {
    render(<BrowserRouter> <AdminProvider> <EditarPerfil/>
    </AdminProvider> </BrowserRouter> );
  
    const botao = screen.getByText('aaaa');
  
    expect(botao).toBeInTheDocument();
  })


