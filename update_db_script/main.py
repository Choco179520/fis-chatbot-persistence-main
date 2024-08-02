import asyncio
import requests
import static.documents.documents
import os
import json
import sys

BASE_URL = "http://localhost:3000/api"
# BASE_URL = "https:/backend-chatbot-fis.hoptech.dev/chatbot-persistence/api"
local_documents = static.documents.documents.documents
directorio = os.path.dirname(os.path.abspath(__file__))
directorio_base = directorio + '/static/documents'

def create_document(title, utterances, response_set_id):
    new_document_payload = {
        "title": title,
        "utterances": utterances,
        "response_set_id": response_set_id,
    }
    res_http = requests.post(f"{BASE_URL}/documents", json=new_document_payload)
    return res_http.json()


async def create_response_set(responses):
    responses_payload = {
        "responses": responses,
    }
    res_http = requests.post(f"{BASE_URL}/response-sets", json=responses_payload)
    return res_http.json()


def get_all_documents():
    return requests.get(f"{BASE_URL}/documents").json()


def get_response_set_by_id(response_set_id):
    return requests.get(f"{BASE_URL}/response-sets/{response_set_id}").json()


def update_response_set_by_id(response_set_id, responses):
    responses_payload = {
        "responses": responses,
    }
    return requests.put(f"{BASE_URL}/response-sets/{response_set_id}", json=responses_payload).json()


def get_documents_by_title(title):
    return requests.get(f"{BASE_URL}/documents/by-title/{title}").json()


async def load_documents_in_db():
    for document in local_documents:
        title = document.get("title")
        utterances = document.get("utterances")
        responses = document.get("responses")

        if not get_documents_by_title(title):
            new_response_set = await create_response_set(responses)
            response_set_id = new_response_set.get('id')

            create_document(title, utterances, response_set_id)
            print("Created new document: ", title)
            continue


def get_title_by_str_id(str_id):
    for document in local_documents:
        if document.get("id") == str_id:
            return document.get("title")


def iterate_documents(func):
    db_documents = get_all_documents()
    for document in db_documents:
        func(document)


def update_action_ids(document):
    response_set_id = document.get("response_set_id")
    response_set = get_response_set_by_id(response_set_id)
    new_responses = []
    for response in response_set.get("responses"):
        if response.get("type") == "action":
            document_title = get_title_by_str_id(response.get("action"))
            if document_title is not None:
                document_id = get_documents_by_title(document_title)[0].get("id")
                response["action"] = document_id
                print("The document \"", document_title, "\" has been updated")
        new_responses.append(response)
    update_response_set_by_id(response_set_id, new_responses)


def create_dir_document(document, responses): 
    path = directorio_base + '/others'

    titleDoc = document["title"].replace(" ", "-")
    titleDoc = titleDoc.lower()

    titleDocu = titleDoc.replace("-", "_")

    data = {
        'id': titleDoc,
        'title': document["title"],
        'responses': responses,
        'utterances':  document["utterances"]
    }

    data_json = json.dumps(data, indent=4)
    data_string = f"{titleDocu} = {data_json}\n"

    nombre_archivo = path + '/' + titleDocu + '.py'
    with open(nombre_archivo, 'w') as file:
        file.write(data_string)

    rutaDoc = directorio_base + '/' + 'documents.py'

    with open(rutaDoc, 'r') as archivoDocs:
        contenido = archivoDocs.read()

    nuevo_import = f'from static.documents.others.{titleDocu} import *\n'
    nuevo_texto = f'{titleDocu},\n'
    
    if nuevo_import not in contenido:
        # Agrega el nuevo import si no está ya presente
        contenido = contenido.replace(f'# NUEVO_DOCUMENTO_IMPORT\n', nuevo_import + '# NUEVO_DOCUMENTO_IMPORT\n')

    if nuevo_texto not in contenido:
        # Agrega el nuevo texto a la lista si no está ya presente
        index_lista = contenido.find('documents = [')
        if index_lista != -1:
            # Encuentra el final de la lista
            index_final_lista = contenido.find(']', index_lista)
            contenido = contenido[:index_final_lista] + '    ' + nuevo_texto + contenido[index_final_lista:]      
        
    # Escribe el contenido modificado de vuelta al archivo
    with open(rutaDoc, 'w') as file:
        file.write(contenido)
    
    print(f'Finaliza la creacion de un nuevo documento....')


def obtener_title_de_json(texto):
    try:
        # Intenta parsear el texto como JSON
        data = json.loads(texto)
        # Accede al valor asociado a la clave 'title'
        return data["title"]
    except ValueError as e:
        # Manejo de la excepción si el texto no es un JSON válido
        return "El texto no es un JSON válido"
    except KeyError as e:
        # Manejo de la excepción si la clave 'title' no existe en el JSON
        return "La clave 'title' no existe en el JSON"

def compare_documents_responses(document):
    response_set_id = document.get("response_set_id")
    db_responses = get_response_set_by_id(response_set_id).get("responses")
    matching_docs = [doc for doc in local_documents if doc["title"] == document["title"]]
    local_responses = matching_docs[0]["responses"] if matching_docs else None

    if local_responses is None:
        print(f"No local responses found for document '{document['title']}'")
        create_dir_document(document, db_responses)
        return

    for local_response, db_response in zip(local_responses, db_responses):
        if (
                local_response.get("content") != db_response.get("content") or
                len(local_responses) != len(db_responses)
        ):
            # print(
            #     f"The document \"{document['title']}\" responses are not updated. "
            #     f"Do you want to update? (y/n):", end=" ")
            # while True:
            #     user_input = input().lower()
            #     if user_input == 'y':
            #         updated_response_set = update_response_set_by_id(response_set_id, local_responses)
            #         print("Updating response:", updated_response_set.get("id"))
            #         break
            #     elif user_input == 'n':
            #         print("Skipping update for this response...")
            #         break
            updated_response_set = update_response_set_by_id(response_set_id, local_responses)
            print("Updating response:", updated_response_set.get("id"))

if __name__ == "__main__":
    asyncio.run(load_documents_in_db())
    iterate_documents(compare_documents_responses)
    iterate_documents(update_action_ids)
