import axios from 'axios';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Componente extends React.Component{
    constructor(){
        super()
        this.state = {
            usuarios:[],
            newUsuariosModal: false
        }
    }
    loadUsuarios(){
        axios.get('http://127.0.0.1:8000/api/usuarios').then((response) => {
            this.setState({
                usuarios: response.data
            })
        })
    }
    componentDidMount(){
        this.loadUsuarios();
    }
    toggleNewUsuariosModal(){
        this.setState({
            newUsuariosModal: true
        })
    }
    render(){
        let usuarios = this.state.usuarios.map((usuarios, idx)=> {
            return(
                <tr key={usuarios.id}>
                    <td>{usuarios.id}</td>
                    <td>{usuarios.name}</td>
                    <td>{usuarios.email}</td>
                    <td>
                        <Button color="success" size="sm" className="mr-2">
                            Edit
                        </Button>
                        <Button color="danger" size="sm">
                            Delete
                        </Button>
                    </td>
                </tr>
            )
        });
        return(
            <div className="App container">
                <Button color="primary" onClick={this.toggleNewUsuariosModal.bind(this)}>Nuevo usuario</Button>
                <Modal isOpen={this.setState.newUsuariosModal} toggle={this.toggleNewUsuariosModal.bind(this)}>
                    <ModalHeader toggle={this.toggleNewUsuariosModal.bind(this)}>Nuevo usuario</ModalHeader>
                    <ModalBody>
                        Test
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={this.toggleNewUsuariosModal.bind(this)}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={this.toggleNewUsuariosModal.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios}
                    </tbody>
                </Table>
            </div>
        );
    }
}
/*export default class Componente extends Component {
    render(){
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                Hola, este es mi primer componente con React!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}*/
if(document.getElementById('componente')){
    ReactDOM.render(<Componente />, document.getElementById('componente'));
}