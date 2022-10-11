import * as React from 'react';
import Modal from 'react-modal';
import './modalInfo.css'
import {FaInfoCircle} from 'react-icons/fa'


// import item from '../../assets/chair.png'
// import view from '../../assets/view.png'

function ModalInfo() {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="containerModal">

      <button id='btn-modal-info' onClick={openModal}>
        <FaInfoCircle size={20}/>
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="modal-overlay"
        className="modal-content"
      >
        <div className='headerModal'>
            <h1>Informaçoes do patrimônio</h1>
            <p>Neste modal você poderá fazer as seguintes alterações:</p>
        </div>
        
        <form>
            <div className='containerUp'>
                <div className='containerImage'>
                    {/* <img alt="item" id='item' src={item} /> */}
                </div>
                <div>
                    <div className='containerInputs'>
                        <div>
                            <label>Modelo</label>
                            <input />
                        </div>
                        <div>
                            <label>Situação</label>
                            <select>
                                <option id='ativo'>
                                    Ativo
                                </option>
                                <option id='manutencao'>
                                    Manutenção
                                </option>
                                <option id='danificado'>
                                    Danificado
                                </option>
                                <option id='movido'>
                                    Movido
                                </option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label>Descrição</label>
                        <textarea />
                    </div>
                </div> 
            </div>


            <div className='containerDown'>
                
                <div className='containerInputs'>
                    <div>
                        <label>Código</label>
                        <input />
                    </div>
                    <div>
                        <label>N° de identificação</label>
                        <input />
                    </div>
                    <div>
                        <label>Localização</label>
                        <input />
                    </div>
                </div>
                <div className='containerInputs'>
                    <div>
                        <label>Responsável</label>
                        <input />
                    </div>
                    <div>
                        <label>Valor</label>
                        <input />
                    </div>
                    <div>
                        <label>Data de aquisição</label>
                        <input />
                    </div>
                </div>
            </div>


            <div className='containerButtons'>
                <button id='back'>Voltar</button>
                <button id='delete'> Excluir</button>
                <button id='edit'>Editar</button>
            </div>
        </form>
      </Modal>

    </div>
  );
}

export default ModalInfo;
