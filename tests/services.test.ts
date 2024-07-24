import {documentService} from '../src/services/documentService';
import {jest} from '@jest/globals';
import {responseSetService} from "../src/services/responseSetService";

jest.mock('@prisma/client');
jest.mock('../src/services/documentService');
jest.mock('../src/services/responseSetService');

describe('Document Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('createDocument should create a new document', async () => {
        const testData = {
            id: 0,
            title: 'Test Document',
            utterances: {example: 'This is a test'},
            response_set_id: 1,
        };

        (documentService.createDocument as jest.MockedFunction<typeof documentService.createDocument>).mockResolvedValueOnce(testData);

        const newDocument = await documentService.createDocument(testData);

        expect(newDocument).toBe(testData);
    });

    test('getDocumentById should retrieve a document by ID', async () => {
    const mockDocument = {
      id: 1,
      title: 'Mock Document',
      utterances: { example: 'Mock Utterance' },
      response_set_id: 2,
    };

    (documentService.getDocumentById as jest.MockedFunction<typeof documentService.getDocumentById>).mockResolvedValueOnce(mockDocument);

    const retrievedDocument = await documentService.getDocumentById(1);

    expect(retrievedDocument).toEqual(mockDocument);
  });

  test('getAllDocuments should retrieve all documents', async () => {
    const mockDocuments = [
      { id: 1, title: 'Document 1', utterances: {}, response_set_id: 1 },
      { id: 2, title: 'Document 2', utterances: {}, response_set_id: 2 },
    ];

    (documentService.getAllDocuments as jest.MockedFunction<typeof documentService.getAllDocuments>).mockResolvedValueOnce(mockDocuments);

    const allDocuments = await documentService.getAllDocuments();

    expect(allDocuments).toEqual(mockDocuments);
  });

  test('getDocumentsByTitle should retrieve documents by title', async () => {
    const title = 'TestTitle';
    const mockDocuments = [
      { id: 1, title, utterances: {}, response_set_id: 1 },
      { id: 2, title, utterances: {}, response_set_id: 2 },
    ];

    (documentService.getDocumentsByTitle as jest.MockedFunction<typeof documentService.getDocumentsByTitle>).mockResolvedValueOnce(mockDocuments);

    const documentsByTitle = await documentService.getDocumentsByTitle(title);

    expect(documentsByTitle).toEqual(mockDocuments);
  });
});

describe('ResponseSet Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('createResponseSet should create a new response set', async () => {
        const testData = {
            id: 0,
            responses: {content: '...'},
        };

        (responseSetService.createResponseSet as jest.MockedFunction<typeof responseSetService.createResponseSet>).mockResolvedValueOnce(testData);

        const newResponseSet = await responseSetService.createResponseSet(testData);

        expect(newResponseSet).toEqual(testData);
    });

    test('getResponseSetById should retrieve a response set by ID', async () => {
        const mockResponseSet = {
            id: 0,
            responses: {content: 'Option 1'},
        };

        (responseSetService.getResponseSetById as jest.MockedFunction<typeof responseSetService.getResponseSetById>).mockResolvedValueOnce(mockResponseSet);

        const retrievedResponseSet = await responseSetService.getResponseSetById(1);

        expect(retrievedResponseSet).toEqual(mockResponseSet);
    });

    test('updateResponseSetById should update a response set by ID', async () => {
        const id = 1;
        const testData = {
            id: 1,
            responses: {updatedOption1: 'Updated Option 1', updatedOption2: 'Updated Option 2'},
        };

        (responseSetService.updateResponseSetById as jest.MockedFunction<typeof responseSetService.updateResponseSetById>).mockResolvedValueOnce(testData);

        const updatedResponseSet = await responseSetService.updateResponseSetById(id, testData);

        expect(updatedResponseSet).toEqual(testData);
    });
});
