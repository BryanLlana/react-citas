import { useEffect, useState } from "react";
import Error from "./Error";

const Formulario = ({pacientes, setPacientes, paciente, setPaciente})=>{
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [alta,  setAlta] = useState('');
    const [sintomas, setSintomas] = useState('');

    const [error, setError] = useState(false);

    useEffect(()=>{
        if(Object.keys(paciente).length > 0){
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setAlta(paciente.alta)
            setSintomas(paciente.sintomas)
        }
    }, [paciente])

    const generarId = ()=>{
        return Math.random().toString(32).substring(2)+Date.now().toString(32);
    }

    const handleSubmit = e=>{
        e.preventDefault();

        if([nombre, propietario, email, alta, sintomas].includes('')){
            setError(true);
            return;
        }

        setError(false);
        const pacienteObj = {nombre, propietario, email, alta, sintomas};

        if(paciente.id){
            pacienteObj.id = paciente.id;
            const arregloActualizado = pacientes.map(pacienteMap=>pacienteMap.id === paciente.id ? pacienteObj : pacienteMap);
            setPacientes(arregloActualizado);
            setPaciente({});
        }else{
            pacienteObj.id = generarId();
            setPacientes([...pacientes, pacienteObj]);
        }

        setNombre('');
        setEmail('');
        setPropietario('');
        setAlta('');
        setSintomas('');
    }

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Segumiento Pacientes</h2>
            <p className="text-lg mt-5 text-center mb-10">Añade Pacientes y <span className="text-indigo-600 font-bold">Administralos</span></p>

            <form className="bg-white shadow-md rounded-lg py-10 px-5 mb-10" onSubmit={handleSubmit}>

                {error && <Error msg="Todos los campos son obligatorios"/>}

                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="mascota">Nombre Mascota</label>
                    <input id="mascota" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" type="text" placeholder="Nombre de la Mascota" value={nombre} onChange={e=>setNombre(e.target.value)}/>
                </div>

                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="propietario">Nombre Propietario</label>
                    <input id="propietario" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" type="text" placeholder="Nombre del Propietario" value={propietario} onChange={e=>setPropietario(e.target.value)}/>
                </div>

                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="email">Email</label>
                    <input id="email" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" type="email" placeholder="Email Contacto Propietario" value={email} onChange={e=>setEmail(e.target.value)}/>
                </div>

                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="alta">Alta</label>
                    <input id="alta" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" type="date" value={alta} onChange={e=>setAlta(e.target.value)}/>
                </div>

                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="sintomas">Síntomas</label>
                    <textarea id="sintomas" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Describe los Síntomas" value={sintomas} onChange={e=>setSintomas(e.target.value)}></textarea>
                </div>

                <input type="submit" className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all" value={paciente.id ? "Editar Paciente" : "Agregar Paciente"}/>
            </form>
        </div>
    )
}

export default Formulario;