import {
  Body,
  Controller,
  Delete,
  Path,
  Post,
  Put,
  Route,
  Tags,
  Response,
} from "tsoa";
import {
  DidDocument,
  IVerificationMethodRegisterPayload,
  IVerificationMethodUpdatePayload,
  ValidateErrorJSON,
} from "../models";
import {
  registerVerificationMethod,
  revokeVerificationMethod,
  updateVerificationMethod,
} from "../services";

@Route("did")
@Tags("Verification Method")
export class DidVerificationMethodController extends Controller {
  /**
   * Register a new verification method to the DID document
   * @summary Register a new verification method to the DID document
   * @param did Identifier as defined in DID specification
   * @param body Register verification method payload
   * @returns DidDocument
   */
  @Post("/{did}/verification-methods")
  @Response<ValidateErrorJSON>(422, "Validation Failed")
  public async register(
    @Path() did: string,
    @Body() body: IVerificationMethodRegisterPayload
  ): Promise<DidDocument> {
    return registerVerificationMethod(did, body);
  }

  /**
   * Update verification method on a DID document
   * @summary Update verification method on a DID document
   * @param did Identifier as defined in DID specification
   * @param id Verification method ID string
   * @param body Update verification method payload
   * @returns DidDocument
   */
  @Put("/{did}/verification-methods/{id}")
  @Response<ValidateErrorJSON>(422, "Validation Failed")
  public async update(
    @Path() did: string,
    @Path() id: string,
    @Body() body: IVerificationMethodUpdatePayload
  ): Promise<DidDocument> {
    return updateVerificationMethod(did, id, body);
  }

  /**
   * Remove verification method from the DID document
   * @summary Remove verification method from the DID document
   * @param did Identifier as defined in DID specification
   * @param id Verification method ID string
   * @returns DidDocument
   */
  @Delete("/{did}/verification-methods/{id}")
  @Response<ValidateErrorJSON>(422, "Validation Failed")
  public async revoke(
    @Path() did: string,
    @Path() id: string
  ): Promise<DidDocument> {
    return revokeVerificationMethod(did, id);
  }
}
