import React from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Alunos from "./components/Alunos"
import ListAlunos from './components/Tabela';


const urlApi = 'http://localhost:8080/';

class App extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            matricula: "",
            nome: "",
            dateNascimento: "",
            email: "",
            curso: "",
            ddd: "",
            telefone: "",
            operadora: "",
            campus: "",
            alunos: [],
            campi: [],
            cursos: [],
            btnLabel: "Inserir"
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.cleanFields = this.cleanFields.bind(this);
    }

    componentDidMount = async () => {
        axios.get(urlApi + 'alunos')
            .then(res => {
                const alunos = res.data;
                this.setState({alunos: alunos});
            })

        axios.get(urlApi + 'campus')
            .then(res => {
                const campus = res.data;
                const cursos = []
                campus.forEach((campus) => {
                    campus.curso.forEach((curso) => {
                        cursos.push(curso)
                    })
                });
                this.setState({campi: campus, cursos: cursos});
            })

    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    async handleDelete(matricula) {
        try {
            await axios.delete(urlApi + 'alunos/' + matricula)
            const alunos = this.state.alunos.filter((aluno) => aluno.matricula !== matricula)
            this.setState({alunos: alunos});
        } catch (e) {
            console.log(e)
        }
    }

    handleUpdate(matricula) {
        const aluno = this.state.alunos.filter((aluno) => aluno.matricula === matricula)
        console.log(aluno)

        this.setState({
            btnLabel: "ATUALIZAR",
            matricula: aluno[0].matricula,
            nome: aluno[0].nome,
            dateNascimento: aluno[0].dateNascimento,
            curso: aluno[0].curso,
        })
    }

    async handleSubmit(e) {
        e.preventDefault();
        console.log("XD")
        const alunoState = {
            matricula: this.state.matricula,
            nome: this.state.nome,
            dateNascimento: this.state.dateNascimento,
            email: this.state.email,
            ddd: this.state.ddd,
            telefone: this.state.telefone,
            operadora: this.state.operadora,
            curso_id: this.state.curso,
            campus_id: this.state.campus,
        }

        try {
            const aluno = (await axios.post(urlApi + 'alunos', alunoState)).data
            const alunos = [...this.state.alunos, aluno]
            this.setState({
                alunos: alunos,
                matricula: "",
                nome: "",
                dateNascimento: "",
                email: "",
            });
        } catch (e) {
            console.log(e)
        }
    }

    cleanFields() {
        this.setState({
            matricula: "",
            nome: "",
            dateNascimento: "",
            email: "",
            btnLabel: "Inserir"
        });
    }

    render() {
        return (
            <div className="App">
                <Alunos btnLabel={this.state.btnLabel}
                        aluno={this.state} handleClean={this.cleanFields}
                        campus={this.state.campi}
                        cursos={this.state.cursos}
                        atualizar={this.state.btnLabel !== "Inserir" ? true : false}
                        handleSubmit={this.handleSubmit}
                        handleChange={this.handleChange}/>
                <ListAlunos modal={this.state.modal} alunos={this.state.alunos} handleUpdate={this.handleUpdate}
                            handleDelete={this.handleDelete}/>
            </div>
        );
    }
}

export default App;
