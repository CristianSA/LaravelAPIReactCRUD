import axios from 'axios';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap';

class Componente extends React.Component{
    constructor(){
        super()
        this.state = {
            usuarios:[],
            newUsuarioData: {
                name:"",
                email: "",
                password: ""
            },
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
            newUsuariosModal: !this.state.newUsuariosModal
        })
    }
    nuevoUsuario(){
        axios.post('http://127.0.0.1:8000/api/usuarios', this.state.newUsuarioData).then((response) => {
            let {usuarios} = this.state;
            this.loadUsuarios();
            this.setState({ usuarios, newUsuariosModal: false, newUsuarioData:{
                name: "",
                email: "",
                password: ""
            }})
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
                <Modal isOpen={this.state.newUsuariosModal} toggle={this.toggleNewUsuariosModal.bind(this)}>
                    <ModalHeader toggle={this.toggleNewUsuariosModal.bind(this)}>Nuevo usuario</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input id="name" 
                            value={this.state.newUsuarioData.name}
                            onChange={(e) => {
                                let {newUsuarioData} = this.state
                                newUsuarioData.name = e.target.value
                                this.setState({ newUsuarioData})
                            }}
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input id="email"
                            value={this.state.newUsuarioData.email}
                            onChange={(e) => {
                                let {newUsuarioData} = this.state
                                newUsuarioData.email = e.target.value
                                this.setState({ newUsuarioData})
                            }}
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input id="password"
                            value={this.state.newUsuarioData.password}
                            onChange={(e) => {
                                let {newUsuarioData} = this.state
                                newUsuarioData.password = e.target.value
                                this.setState({ newUsuarioData})
                            }}
                            ></Input>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={this.nuevoUsuario.bind(this)}>Guardar usuario</Button>{' '}
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
export default Componente;
if(document.getElementById('componente')){
    ReactDOM.render(<Componente />, document.getElementById('componente'));
}