import { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import { MdLock, MdEmail } from 'react-icons/md';
import Imagem1 from '../../assets/imagemlogin.png';
import Logo from '../../assets/logosenai.png';
import Logo2 from '../../assets/logosenai2.png';
import '../../styles/App.css';
import { useDispatch } from "react-redux";
import axios from 'axios';

export default function Login(){
  const [userData, setUserData] = useState({email:'', password:''});
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handlerSubmit(e){
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/login`,userData)
    .then(({data:{token}})=>{
      dispatch({type:"ADD_TOKEN", data:token})
      navigate("/departments");
    })
    .catch(({response:{data:{msg}}})=>setError(msg));
  }

  return(
    <div className="App">
      <div className="appAside">
        <img className="logosenai" src={Logo}/>
        <img className="imagemteste" src={Imagem1}/>
      </div>
      <div className="appForm">
        <img className="logosenai2" src={Logo2}/>
        <div className="pageSwitcher">
          GERENCIAMENTO DE PATRIMÔNIO 
        </div>
        <div className="formTitle">
          <Link
            to="/"
            className="formTitleLink-active formTitleLink"
          >
            Entrar
          </Link>
          {" "}ou{" "}
          <Link
            exact
            to="/register"
            activeClassName="formTitleLink-active"
            className="formTitleLink"
          >
            Cadastrar
          </Link>
        </div>
        <div className="formCenter">
            <form className="formFields" onSubmit={(e)=>handlerSubmit(e)}>
              <div className="formField">
                <MdEmail className="senha" size={20} color="gray"/>
                <input
                  type="email"
                  id="email"
                  className="formFieldInput"
                  placeholder="Entre com seu Email"
                  name="email"
                  value={userData.email}
                  onChange={(event)=>setUserData({...userData, email:event.target.value})}
                />
              </div>
              <div className="formField">
                <label className="formFieldLabel" htmlFor="password">
                </label>
                <MdLock className="senha" size={20} color="gray"/>
                <input
                  type="password"
                  id="password"
                  className="formFieldInput"
                  placeholder="Entre com sua Senha"
                  name="password"
                  value={userData.password}
                  onChange={(event)=>setUserData({...userData, password:event.target.value})}
                />
              </div>
              <div className="formField">
                <button className="formFieldButton" type="submit">Entrar</button>
              </div>
              <Link to="" className="formFieldLink">
                  Esqueci minha Senha
              </Link>
            </form>
            {error&& <p id="errorLogin">{error}</p>}
        </div>
      </div>
    </div>
  );
}