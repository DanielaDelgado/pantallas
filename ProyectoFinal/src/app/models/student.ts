export class Student {
    user: {
        student: {
          _id:string,
          fullName: string,
          controlNumber: string,
          nip: string,
          career: string,
          __v: string,
          averageOriginSchool: string,
          birthPlace:string,
          city:string,
          civilStatus:string,
          cp: string,
          curp:string,
          disability: string,
          email: string,
          etnia: string,
          fatherLastName: string,
          firstName: string,
          motherLastName: string,
          nameOriginSchool:string ,
          nss: string,
          originSchool:string ,
          otherSchool:string ,
          phone: string,
          state: string,
          street: string,
          suburb: string,
          typeDisability: string,
          typeEtnia: string,
          folderId: {
            _id: string,
            idFolderInDrive: string
          },
          dateBirth:string,
          sex: string
        },
        career: {
          fullName: string,
          shortName:string,
          acronym: string,
          _id: string
        },
      }
      token: string
      action: string
}
export class InfoStudent {
  firstName: string
  fatherLastName: string
  motherLastName: string
  birthPlace: string
  dateBirth: string
  civilStatus: string
  email: string
  curp: string
  sex: string
  street:string
  suburb:string
  city:string
  state:string
  cp:number
  phone:string
  etnia:string
  typeEtnia:string
  disability:string
  typeDisability:string
  originSchool:string
  otherSchool:string
  nameOriginSchool:string
  averageOriginSchool:number
  nss:string
}