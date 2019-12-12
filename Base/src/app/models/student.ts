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

