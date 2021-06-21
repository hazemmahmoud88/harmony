/* eslint-disable max-len */
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { getVariablesByIds } from '../../app/util/cmr';

describe('util/cmr', function () {
  describe('getVariablesByIds', function () {
    it('returns a valid response, given a huge number of variables', async function () {
      const ids = [
        'V1240763852-POCLOUD', 'V1240763854-POCLOUD', 'V1240763844-POCLOUD',
        'V1240763639-POCLOUD', 'V1240763684-POCLOUD', 'V1240763678-POCLOUD',
        'V1240763985-POCLOUD', 'V1240763656-POCLOUD', 'V1240763714-POCLOUD',
        'V1240764037-POCLOUD', 'V1240763868-POCLOUD', 'V1240763995-POCLOUD',
        'V1240763674-POCLOUD', 'V1240763913-POCLOUD', 'V1240764053-POCLOUD',
        'V1240763690-POCLOUD', 'V1240763758-POCLOUD', 'V1240764027-POCLOUD',
        'V1240764075-POCLOUD', 'V1240763983-POCLOUD', 'V1240764051-POCLOUD',
        'V1240763662-POCLOUD', 'V1240763611-POCLOUD', 'V1240763935-POCLOUD',
        'V1240763963-POCLOUD', 'V1240763643-POCLOUD', 'V1240763653-POCLOUD',
        'V1240764140-POCLOUD', 'V1240764136-POCLOUD', 'V1240764144-POCLOUD',
        'V1240763838-POCLOUD', 'V1240763864-POCLOUD', 'V1240763605-POCLOUD',
        'V1240763744-POCLOUD', 'V1240764009-POCLOUD', 'V1240763686-POCLOUD',
        'V1240763626-POCLOUD', 'V1240763850-POCLOUD', 'V1240763836-POCLOUD',
        'V1240764112-POCLOUD', 'V1240763819-POCLOUD', 'V1240764079-POCLOUD',
        'V1240763734-POCLOUD', 'V1240763809-POCLOUD', 'V1240764041-POCLOUD',
        'V1240764073-POCLOUD', 'V1240763840-POCLOUD', 'V1240763975-POCLOUD',
        'V1240763846-POCLOUD', 'V1240763615-POCLOUD', 'V1240763907-POCLOUD',
        'V1240764077-POCLOUD', 'V1240764035-POCLOUD', 'V1240764001-POCLOUD',
        'V1240763567-POCLOUD', 'V1240763732-POCLOUD', 'V1240763746-POCLOUD',
        'V1240764104-POCLOUD', 'V1240763776-POCLOUD', 'V1240763858-POCLOUD',
        'V1240763710-POCLOUD', 'V1240763848-POCLOUD', 'V1240763730-POCLOUD',
        'V1240763891-POCLOUD', 'V1240763842-POCLOUD', 'V1240764049-POCLOUD',
        'V1240763780-POCLOUD', 'V1240764130-POCLOUD', 'V1240764081-POCLOUD',
        'V1240763565-POCLOUD', 'V1240763991-POCLOUD', 'V1240763882-POCLOUD',
        'V1240763658-POCLOUD', 'V1240764025-POCLOUD', 'V1240764067-POCLOUD',
        'V1240763905-POCLOUD', 'V1240763682-POCLOUD', 'V1240763874-POCLOUD',
        'V1240763762-POCLOUD', 'V1240763941-POCLOUD', 'V1240763977-POCLOUD',
        'V1240764132-POCLOUD', 'V1240763748-POCLOUD', 'V1240763828-POCLOUD',
        'V1240764098-POCLOUD', 'V1240764124-POCLOUD', 'V1240763949-POCLOUD',
        'V1240763589-POCLOUD', 'V1240763893-POCLOUD', 'V1240764021-POCLOUD',
        'V1240763760-POCLOUD', 'V1240763830-POCLOUD', 'V1240763718-POCLOUD',
        'V1240763800-POCLOUD', 'V1240763641-POCLOUD', 'V1240763597-POCLOUD',
        'V1240763666-POCLOUD', 'V1240764005-POCLOUD', 'V1240763961-POCLOUD',
        'V1240763866-POCLOUD', 'V1240763725-POCLOUD', 'V1240763796-POCLOUD',
        'V1240763951-POCLOUD', 'V1240763792-POCLOUD', 'V1240763553-POCLOUD',
        'V1240763919-POCLOUD', 'V1240763834-POCLOUD', 'V1240763917-POCLOUD',
        'V1240763876-POCLOUD', 'V1240764120-POCLOUD', 'V1240763798-POCLOUD',
        'V1240764029-POCLOUD', 'V1240763967-POCLOUD', 'V1240763575-POCLOUD',
        'V1240763870-POCLOUD', 'V1240764047-POCLOUD', 'V1240764057-POCLOUD',
        'V1240763915-POCLOUD', 'V1240763635-POCLOUD', 'V1240763965-POCLOUD',
        'V1240763668-POCLOUD', 'V1240763617-POCLOUD', 'V1240763595-POCLOUD',
        'V1240764126-POCLOUD', 'V1240763772-POCLOUD', 'V1240763817-POCLOUD',
        'V1240763786-POCLOUD', 'V1240763790-POCLOUD', 'V1240763999-POCLOUD',
        'V1240764011-POCLOUD', 'V1240763577-POCLOUD', 'V1240763569-POCLOUD',
        'V1240763599-POCLOUD', 'V1240763670-POCLOUD', 'V1240763987-POCLOUD',
        'V1240763571-POCLOUD', 'V1240763979-POCLOUD', 'V1240763664-POCLOUD',
        'V1240763720-POCLOUD', 'V1240763811-POCLOUD', 'V1240763989-POCLOUD',
        'V1240763901-POCLOUD', 'V1240764134-POCLOUD', 'V1240763645-POCLOUD',
        'V1240764108-POCLOUD', 'V1240763925-POCLOUD', 'V1240764019-POCLOUD',
        'V1240764015-POCLOUD', 'V1240763943-POCLOUD', 'V1240763766-POCLOUD',
        'V1240763728-POCLOUD', 'V1240763782-POCLOUD', 'V1240763628-POCLOUD',
        'V1240763997-POCLOUD', 'V1240764033-POCLOUD', 'V1240763613-POCLOUD',
        'V1240763591-POCLOUD', 'V1240763764-POCLOUD', 'V1240763692-POCLOUD',
        'V1240763676-POCLOUD', 'V1240763931-POCLOUD', 'V1240763581-POCLOUD',
        'V1240763862-POCLOUD', 'V1240763909-POCLOUD', 'V1240764055-POCLOUD',
        'V1240764043-POCLOUD', 'V1240763880-POCLOUD', 'V1240764148-POCLOUD',
        'V1240763660-POCLOUD', 'V1240763768-POCLOUD', 'V1240763927-POCLOUD',
        'V1240763955-POCLOUD', 'V1240763945-POCLOUD', 'V1240763921-POCLOUD',
        'V1240763742-POCLOUD', 'V1240763752-POCLOUD', 'V1240763559-POCLOUD',
        'V1240764065-POCLOUD', 'V1240763700-POCLOUD', 'V1240763911-POCLOUD',
        'V1240763933-POCLOUD', 'V1240763824-POCLOUD', 'V1240764003-POCLOUD',
        'V1240764090-POCLOUD', 'V1240763774-POCLOUD', 'V1240763680-POCLOUD',
        'V1240763969-POCLOUD', 'V1240764069-POCLOUD', 'V1240763579-POCLOUD',
        'V1240763889-POCLOUD', 'V1240763794-POCLOUD', 'V1240763573-POCLOUD',
        'V1240763973-POCLOUD', 'V1240764146-POCLOUD', 'V1240763821-POCLOUD',
        'V1240763887-POCLOUD', 'V1240764114-POCLOUD', 'V1240763557-POCLOUD',
        'V1240764128-POCLOUD', 'V1240763957-POCLOUD', 'V1240763788-POCLOUD',
        'V1240763878-POCLOUD', 'V1240764138-POCLOUD', 'V1240763583-POCLOUD',
        'V1240764095-POCLOUD', 'V1240763971-POCLOUD', 'V1240764116-POCLOUD',
        'V1240763923-POCLOUD', 'V1240763593-POCLOUD', 'V1240763607-POCLOUD',
        'V1240764085-POCLOUD', 'V1240763740-POCLOUD', 'V1240763672-POCLOUD',
        'V1240763807-POCLOUD', 'V1240763619-POCLOUD', 'V1240763754-POCLOUD',
        'V1240764059-POCLOUD', 'V1240763624-POCLOUD', 'V1240764061-POCLOUD',
        'V1240763587-POCLOUD', 'V1240763872-POCLOUD', 'V1240764013-POCLOUD',
        'V1240764100-POCLOUD', 'V1240763698-POCLOUD', 'V1240763750-POCLOUD',
        'V1240763632-POCLOUD', 'V1240763939-POCLOUD', 'V1240764083-POCLOUD',
        'V1240763738-POCLOUD', 'V1240763959-POCLOUD', 'V1240763856-POCLOUD',
        'V1240763694-POCLOUD', 'V1240764063-POCLOUD', 'V1240764122-POCLOUD',
        'V1240763702-POCLOUD', 'V1240763802-POCLOUD', 'V1240763561-POCLOUD',
        'V1240763981-POCLOUD', 'V1240764071-POCLOUD', 'V1240763630-POCLOUD',
        'V1240763712-POCLOUD', 'V1240764110-POCLOUD', 'V1240763637-POCLOUD',
        'V1240763947-POCLOUD', 'V1240763778-POCLOUD', 'V1240763649-POCLOUD',
        'V1240763937-POCLOUD', 'V1240763706-POCLOUD', 'V1240763603-POCLOUD',
        'V1240764031-POCLOUD', 'V1240763815-POCLOUD', 'V1240764106-POCLOUD',
        'V1240763993-POCLOUD', 'V1240763897-POCLOUD', 'V1240763953-POCLOUD',
        'V1240763736-POCLOUD', 'V1240763601-POCLOUD', 'V1240763708-POCLOUD',
        'V1240763622-POCLOUD', 'V1240763895-POCLOUD', 'V1240764023-POCLOUD',
        'V1240763826-POCLOUD', 'V1240764045-POCLOUD', 'V1240763716-POCLOUD',
        'V1240763688-POCLOUD', 'V1240763770-POCLOUD', 'V1240763860-POCLOUD',
        'V1240763723-POCLOUD', 'V1240763884-POCLOUD', 'V1240764039-POCLOUD',
        'V1240764017-POCLOUD', 'V1240763929-POCLOUD', 'V1240764118-POCLOUD',
        'V1240763696-POCLOUD', 'V1240763784-POCLOUD', 'V1240763585-POCLOUD',
        'V1240764142-POCLOUD', 'V1240763899-POCLOUD', 'V1240764007-POCLOUD',
        'V1240763704-POCLOUD', 'V1240763609-POCLOUD', 'V1240763805-POCLOUD',
        'V1240763555-POCLOUD', 'V1240763903-POCLOUD', 'V1240763563-POCLOUD',
        'V1240764102-POCLOUD', 'V1240763756-POCLOUD', 'V1240763551-POCLOUD',
        'V1240763832-POCLOUD',
      ];
      const variables = await getVariablesByIds(ids, '');
      expect(variables.length).to.not.eql(0);
    });
  });
});
