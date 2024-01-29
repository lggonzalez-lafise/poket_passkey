import {
    usePasswordless,
    useLocalUserCache,
    useAwaitableState
} from "../client/react-native";

import { useEffect, useState } from "react";
import {
    TouchableOpacity,
    Linking,
    View,
    StyleSheet,
    Text,
    TextInput,
} from "react-native";
import {Styles} from "../styles/styles";
import {Button} from "../components/Button";

const StepUpAuth = () => {

    const {
        signInStatus,
        tokensParsed,
        authenticateWithFido2,
        stepUpAuthenticationWithSmsOtp,
        busy,
        fido2Credentials,
    } = usePasswordless();


    const { currentUser } = useLocalUserCache();
    const [consentId, setConsentId] = useState("");
    const [lastError, setLastError] = useState();
    const [stepUpAuthIdToken, setStepUpAuthIdToken] = useState("");
    const [smsOtpPhoneNumber, setSmsOtpPhoneNumber] = useState("");
    const [isWrongSmsOtp, setIsWrongSmsOtp] = useState(false);
    const showSmsOtpInput = !!smsOtpPhoneNumber;
    const [smsOtp, setSmsOtp] = useState("");
    const {
        awaitable: awaitableSmsOtp,
        resolve: resolveSmsOtp,
        awaited: awaitedSmsOtp,
        reject: cancelWaitingForSmsOtp,
    } = useAwaitableState(smsOtp);

    const handleStepUpAuthentication = (stepUpAuthFn: any)=>{
        setLastError(undefined);
        setStepUpAuthIdToken("");
        stepUpAuthFn()
            .signedIn.then((data: any) => setStepUpAuthIdToken(data.idToken))
            .catch(setLastError);
    }

    useEffect(() => {
        if (signInStatus !== "SIGNED_IN") {
            setLastError(undefined);
            setConsentId("");
            setSmsOtpPhoneNumber("");
            setIsWrongSmsOtp(false);
            setStepUpAuthIdToken("");
        }
    }, [signInStatus]);

    if (!tokensParsed) return null;

    return (
        <View style={styles.stepUpAuthMain}>
            <View>
                <Text style={styles.stepUpAuthTitle}>Step up Authentication</Text>
                <View>
                    <Text>Enter a Consent ID. You can make one up,</Text>
                    <Text>
                        but let's pretend there's a transaction backend that generated it.
                    </Text>
                    <View style={styles.row}>
                        <Text>Also see:</Text>
                        <TouchableOpacity
                            onPress={() => Linking.openURL("https://github.com/aws-samples/amazon-cognito-passwordless-auth/blob/main/SMS-OTP-STEPUP.md#step-up-authentication-with-sms-one-time-password")
                        }>
                            <Text style={styles.link}>
                                "explanation of the step up procedure"
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder={"Consent ID"}
                    value={consentId}
                    onChangeText={(e) => setConsentId(e)}
                    //disabled={busy}
                    autoFocus
                />
                <Text>
                    Next, initiate Step Up authentication. Choose either method:
                </Text>
                <View style={styles.stepUpAuthButtons}>
                    <Button
                        style={styles.stepUpAuthButton}
                        title={!fido2Credentials?.length
                                ? "To use WebAuthn, first add face or touch unlock"
                                : undefined
                        }
                        disabled={!fido2Credentials?.length || !consentId || busy}
                        onClick={() =>
                            handleStepUpAuthentication(() =>
                                authenticateWithFido2({
                                    username: tokensParsed.idToken["cognito:username"],
                                    credentials: currentUser?.credentials,
                                    clientMetadata: { consent_id: consentId },
                                })
                            )
                        }>
                        <Text style={[
                            Styles.buttonText,
                            !fido2Credentials?.length || !consentId || busy ? Styles.buttonTextDisabled : null,]
                        }>
                            WebAuthn
                        </Text>
                    </Button>
                    <Button
                        style={styles.stepUpAuthButton}
                        disabled={!consentId || busy}
                        onClick={() => {
                            setIsWrongSmsOtp(false);
                            handleStepUpAuthentication(() =>
                                stepUpAuthenticationWithSmsOtp({
                                    username: tokensParsed.idToken["cognito:username"],
                                    smsMfaCode: (phoneNumber, attempt) => {
                                        setSmsOtpPhoneNumber(phoneNumber);
                                        setIsWrongSmsOtp(attempt > 1);
                                        return awaitableSmsOtp();
                                    },
                                    clientMetadata: { consent_id: consentId },
                                }).signedIn.finally(() => {
                                    setSmsOtp("");
                                    setSmsOtpPhoneNumber("");
                                })
                            );
                        }}
                    >
                        <Text
                            style={[
                                Styles.buttonText,
                                !consentId || busy ? Styles.buttonTextDisabled : null,
                            ]}
                        >
                            SMS OTP
                        </Text>
                    </Button>
                </View>
                {showSmsOtpInput && (
                    <>
                        <Text>Enter the OTP code we've sent to {smsOtpPhoneNumber}:</Text>
                        <View
                            // style={styles.otpForm}
                            // onSubmit={(e) => {
                            //     e.preventDefault();
                            //     setIsWrongSmsOtp(false);
                            //     resolveSmsOtp();
                            // }}
                        >
                            <TextInput
                                id="sms-otp"
                                //type="text"
                                inputMode="numeric"
                                //pattern="[0-9]{6}"
                                autoComplete="one-time-code"
                                placeholder="OTP code"
                                autoFocus
                                //title="OTP Code: should be 6 numbers"
                                value={smsOtp}
                                onChangeText={(e) => setSmsOtp(e)}
                                //disabled={!!awaitedSmsOtp && !isWrongSmsOtp}
                                maxLength={6}
                            />
                            <Button
                                type="submit"
                                disabled={
                                    smsOtp.length < 6 || (!!awaitedSmsOtp && !isWrongSmsOtp)
                                }
                            >
                                <Text>Submit</Text>
                            </Button>
                            <Button
                                disabled={!!awaitedSmsOtp && !isWrongSmsOtp}
                                type="button"
                                onClick={() =>
                                    cancelWaitingForSmsOtp(
                                        new Error("SMS OTP step up authentication cancelled")
                                    )
                                }
                            >
                                <Text>Cancel</Text>
                            </Button>
                        </View>
                    </>
                )}
                {stepUpAuthIdToken && (
                    <View>
                        <Text>
                            Good job, you stepped up authentication. Your Consent ID was added
                            to your ID-token:
                        </Text>
                        <TouchableOpacity
                            onPress={() =>
                                Linking.openURL(
                                    `https://jwtinspector.kevhak.people.aws.dev/inspect#token=${stepUpAuthIdToken}&tab=payload`
                                )
                            }
                        >
                            <Text style={[styles.link, styles.textCenter]}>View</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <View>
                {!lastError && awaitedSmsOtp && isWrongSmsOtp && (
                    <Text>That's not the right code</Text>
                )}
                {lastError && <Text>{lastError?? ''}</Text>}
            </View>
        </View>
    );
}

export default StepUpAuth;

const styles = StyleSheet.create({
    stepUpAuthMain: {
        margin: 10,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 6,
        padding: 16,
    },
    stepUpAuthTitle: {
        fontWeight: "bold",
        textDecorationLine: "underline",
        marginBottom: 6,
    },
    row: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
    },
    link: {
        color: "blue",
        textDecorationLine: "underline",
    },
    textCenter: {
        marginTop: 6,
        textAlign: "center",
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        marginVertical: 10,
        fontSize: 14,
        lineHeight: 16,
        padding: 4,
    },
    stepUpAuthButtons: {
        marginVertical: 10,
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    stepUpAuthButton: {
        flex: 1,
    },
});