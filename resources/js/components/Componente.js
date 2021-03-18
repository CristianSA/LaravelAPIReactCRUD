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
            editUsuarioData: {
                id:"",
                name:"",
                email: ""
            },
            newUsuariosModal: false,
            editUsuarioModal:false
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
    toggleEditUsuariosModal(){
        this.setState({
            editUsuarioModal: !this.state.editUsuarioModal
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
    actualizarUsuario(){
        let {id, name, email} = this.state.editUsuarioData
        axios.put('http://127.0.0.1:8000/api/usuarios/'+id,{
            name,
            email
        }).then((response) => {
            this.loadUsuarios()
            this.setState({editUsuarioModal: false, editUsuarioData:{
                id:"",
                name:"",
                email:""
            }})
        })
    }
    editUsuario(id, name, email){
        this.setState({
            editUsuarioData:{id, name, email},
            editUsuarioModal: !this.state.editUsuarioModal
        })
    }
    deleteUsuario(id){
        axios.delete('http://127.0.0.1:8000/api/usuarios/'+id).then((response) => {
            this.loadUsuarios()
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
                        <Button color="success" size="sm" className="mr-2"
                            onClick={this.editUsuario.bind(this, usuarios.id, usuarios.name, usuarios.email, usuarios.password)}
                        >
                            Edit
                        </Button>
                        <Button color="danger" size="sm"
                            onClick={this.deleteUsuario.bind(this, usuarios.id)}
                        >
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
                <Modal isOpen={this.state.editUsuarioModal} toggle={this.toggleEditUsuariosModal.bind(this)}>
                    <ModalHeader toggle={this.toggleEditUsuariosModal.bind(this)}>Editar usuario</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input id="name" 
                            value={this.state.editUsuarioData.name}
                            onChange={(e) => {
                                let {editUsuarioData} = this.state
                                editUsuarioData.name = e.target.value
                                this.setState({ editUsuarioData})
                            }}
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input id="email"
                            value={this.state.editUsuarioData.email}
                            onChange={(e) => {
                                let {editUsuarioData} = this.state
                                editUsuarioData.email = e.target.value
                                this.setState({ editUsuarioData})
                            }}
                            ></Input>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={this.actualizarUsuario.bind(this)}>Actualizar usuario</Button>{' '}
                    <Button color="secondary" onClick={this.toggleEditUsuariosModal.bind(this)}>Cancel</Button>
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
export default Componente;
if(document.getElementById('componente')){
    ReactDOM.render(<Componente />, document.getElementById('componente'));
}