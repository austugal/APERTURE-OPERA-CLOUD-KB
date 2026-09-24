# IFC Controller and IFC8 Installation for OPERA Cloud

Step-by-step installation of the OPERA IFC Controller and IFC8 at a property connected to OPERA Cloud.

Source: Oracle *OPERA IFC Controller and Hotel Property Interface (IFC8) Information and Installation Guide*, Release 2.0, December 2021 **[T1]** unless marked. Field practice is marked **[T2]**. Back to [IFC8 guides](opera-doc.html?file=ifc8-guides-index.md).

## 1. Before you start

| Item | Requirement | Tier |
|---|---|---|
| Server | Windows machine at the property, on a Microsoft-supported OS | [T1] |
| Memory | 256 MB for Windows, plus the IFC8 version's own requirement, plus 100 MB for the controller | [T1] |
| .NET | 4.5 or higher for controller versions above 5.03.00015 | [T1] |
| Controller version | 5.03.00018 or higher for OPERA Cloud | [T1] |
| Downloads | My Oracle Support > Patches & Updates: "Oracle Hospitality Suite8 Property Interfaces" and "Oracle Hospitality OPERA Property - Special Interfaces" | [T1] |
| Windows Server 2012 R2 | Microsoft patch KB2919355 and current security patches, for the approved TLS ciphers | [T1] |
| Network | Outbound HTTPS from the IFC server to the OPERA Cloud IFC endpoint. Port to the vendor system open on the local network | [T2] |
| Access | Local administrator on the IFC server | [T2] |

Collect from the project: OPERA Cloud IFC endpoint URL, property code, interface number, service account credentials, vendor IP and port or serial settings. [T2]

## 2. Create the service account

In OPERA Cloud Role Manager, a user with the WS-ACCESS role, or a role holding Manage Users, New/Edit Users or Show All Users, creates the service account and its password. [T1]

In Shared Security Domain environments, interface users are created in Oracle Identity Management. See My Oracle Support Doc ID 2329730.1. [T1] Lifecycle, expiry and backup accounts: [SSD interface service account](opera-doc.html?file=ssd-interface-service-account.md).

## 3. Install the IFC Controller

1. Run `OperaIFCController-Installer.exe` as administrator. It installs new or upgrades an existing controller.
2. Keep the default destination folder.
3. Set the fields:

| Field | Set to | Note |
|---|---|---|
| Log Level | `ERROR` | `DEBUG` for troubleshooting. `TRACE` only when Oracle asks |
| Log Size | `1500000` bytes | |
| Log Purge | Days of logs to keep | Older logs are deleted at startup |
| Log Path | Same folder structure as the IFC8 logs | Copy `UP.gif`, `DOWN.gif` and `Log.xsl` there to read the logs |
| Send Interval, Timeout, Max Retry, Retry Interval, Use Clob, Send Cfg Xml | Defaults | Raise Send Interval only if the vendor cannot keep up |
| Server name | The OSB or OHS server name | Edited in the registry after install, see step 4 |
| OPERA DB Datasource | Default | Not used for OPERA Cloud |
| Property | Property code in capitals | Must be a property the service account can access |

4. Finish, then set the full endpoint in the registry value `OperaIfcWS` at `HKEY_LOCAL_MACHINE\Software\Wow6432Node\Micros-Fidelio\OPERA IFC Controller`. OPERA Cloud formats [T1]:
   - `https://<OSB or OHS server>/OPERA9OSB/opera/OperaIFCServices/IFCInternalService`
   - Environments with a dedicated OHS for IFC: `https://<OHS load balancer>/OPERAWS/opera/Auth/OperaIFCServices/IFCInternalService`
5. Open `services.msc` and confirm the OPERA IFC Controller service is running.

Take the exact endpoint from the Oracle provisioning details for the tenant, not from an example. [T2]

## 4. Credentials and TLS

1. Run `OperaControllerExe.exe` as administrator.
2. Config > User Credentials. Enter the service account user name and password. Apply. Credentials are stored encrypted and cannot be viewed afterwards.
3. Security level: keep **Moderate** (TLS 1.2, operating system cipher defaults) or use **Maximum** (TLS 1.2 with cipher and hash registry keys matching OHS). Do not use Minimum.
4. Use Update after any other change, and Restart to restart the service. Do not rely on the View Log and Test URL buttons.

## 5. Install IFC8

1. Run the IFC8 installer as administrator. Choose **IFC8 for OPERA**.
2. Keep drive C. Files go to `C:\fidelio\programs` and `C:\fidelio\ifc8`.
3. Confirm `IFC8ComEx.tlb` exists. If missing, repair .NET 4.x.
4. Follow the installation guide for the specific IFC8 version and vendor driver. [T1]

## 6. Link IFC8 to the OPERA interface

1. Open the `IFCConfig.xml` file with `IFC8.exe`.
2. Properties > Configuration. Enter the Windows credentials for the IFC8 machine. Domain can stay blank.
3. PMS1 tree > Application Layer > OPERA. Set `IfcNum` to the interface number created in OPERA Cloud.
4. Enter, Apply. IFC8 reinitialises.
5. Save the configuration (red save button), close, then untick **Enable Config Mode** in Properties.
6. Set the vendor side of the connection in the IFC tree: TCP/IP address and port, or serial settings. [T2]

Status lights [T1]:

| Colour | Meaning |
|---|---|
| Green | Connected |
| Yellow | Listening, waiting for the other side |
| Red | No connection |

PMS green and IFC yellow means OPERA is connected and IFC8 is waiting for the vendor system. The middle links turn green once both sides talk.

## 7. Troubleshooting from the controller log

| Log message | Cause | Fix |
|---|---|---|
| `The remote name could not be resolved` | Wrong server name or endpoint | Correct `OperaIfcWS` in the registry |
| `OSB-386200: General web service security error` | Missing or wrong service account credentials | Re-enter credentials in `OperaControllerExe.exe`. Check expiry and lockout |
| `Error connecting to Web Service with SSL protocol` | TLS level mismatch between IFC server and OPERA | Set Moderate or Maximum. Patch Windows for TLS 1.2 ciphers |
| `SSD00002 ... User is not authorized for the hotel code in the payload` | Property code not linked to the service account's tenant | Fix the Property value or the account's property access |
| `Configuration is missing for machine <NAME>` | IFC machine not registered in OPERA | Add the machine name to IFC Machines configuration |
| `ORA-06508: PL/SQL: could not find program unit being called` | OPERA database or web service issue | Check the environment status. Raise with Oracle |
| `Interface is not active.(<IfcNum>)` | The OPERA property interface is inactive or the number is wrong | Activate the interface. Check `IfcNum` |

All messages and causes above: [T1].

## 8. Go-live checklist [T2]

1. Controller service set to start automatically, running under the agreed account.
2. IFC8 set to start with Windows, as a service or scheduled task per the vendor's guidance.
3. Log level DEBUG for 48 hours, then ERROR.
4. Service account expiry date recorded, backup account staggered.
5. Every interface function tested and signed off with the vendor.
6. Support contacts for the vendor, the IFC server and Oracle recorded in the hypercare plan.
