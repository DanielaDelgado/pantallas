export class Documents {
    documents: [
        {
          releaseDate: string,
          _id: string,
          filename: string,
          type: string,
          fileIdInDrive: string,
          status: [
            {
              date: string,
              _id: string,
              name: string,
              active: boolean,
              message: string,
              observation?: string
            }
          ]
        }
      ]
      action: string
}

export class Document{
  releaseDate: string
  _id: string
  filename: string
  type: string
  fileIdInDrive: string
  status: [
    {
      date: string,
      _id: string,
      name: string,
      active: boolean,
      message: string,
      observation?: string
    }
  ]
}
export class Status{
  date: string
  _id: string
  name: string
  active: boolean
  message: string
  observation?: string
}

export class Foto {
    action: string
    file: string
}